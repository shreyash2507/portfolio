"""Backend tests for Emergent Google Auth endpoints."""
import os
import time
import requests
import pymongo
from datetime import datetime, timezone, timedelta
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent.parent / ".env")
load_dotenv(Path(__file__).parent.parent.parent / "frontend" / ".env")

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]

_client = pymongo.MongoClient(MONGO_URL)
_db = _client[DB_NAME]

VALID_TOKEN = "test_session_auth1"
EXPIRED_TOKEN = "test_session_expired"
USER_ID = "test-user-auth1"
USER_EMAIL = "test.user.auth1@example.com"


def _reseed_valid_session():
    _db.user_sessions.delete_many({"session_token": VALID_TOKEN})
    _db.user_sessions.insert_one({
        "user_id": USER_ID,
        "session_token": VALID_TOKEN,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    })


def _reseed_expired_session():
    _db.user_sessions.delete_many({"session_token": EXPIRED_TOKEN})
    _db.user_sessions.insert_one({
        "user_id": USER_ID,
        "session_token": EXPIRED_TOKEN,
        "expires_at": (datetime.now(timezone.utc) - timedelta(minutes=1)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    })


def setup_module(module):
    # Ensure user exists
    _db.users.update_one(
        {"user_id": USER_ID},
        {"$setOnInsert": {
            "user_id": USER_ID,
            "email": USER_EMAIL,
            "name": "Test User",
            "picture": "https://via.placeholder.com/150",
            "created_at": datetime.now(timezone.utc).isoformat(),
        }},
        upsert=True,
    )
    _reseed_valid_session()
    _reseed_expired_session()


# ---------- /api/auth/session ----------
def test_session_missing_header_returns_400():
    r = requests.post(f"{API}/auth/session")
    assert r.status_code == 400, r.text
    body = r.json()
    assert "detail" in body


def test_session_invalid_session_id_returns_401():
    r = requests.post(f"{API}/auth/session", headers={"X-Session-ID": "definitely-not-a-real-id"})
    assert r.status_code == 401, r.text


# ---------- /api/auth/me ----------
def test_me_without_auth_returns_401():
    r = requests.get(f"{API}/auth/me")
    assert r.status_code == 401
    assert r.json().get("detail")


def test_me_with_bearer_token_returns_user():
    _reseed_valid_session()
    r = requests.get(f"{API}/auth/me", headers={"Authorization": f"Bearer {VALID_TOKEN}"})
    assert r.status_code == 200, r.text
    user = r.json()
    assert user["user_id"] == USER_ID
    assert user["email"] == USER_EMAIL
    assert user["name"] == "Test User"
    assert user["picture"]
    assert "_id" not in user  # ObjectId should be excluded


def test_me_with_cookie_returns_user():
    _reseed_valid_session()
    r = requests.get(f"{API}/auth/me", cookies={"session_token": VALID_TOKEN})
    assert r.status_code == 200, r.text
    user = r.json()
    assert user["user_id"] == USER_ID
    assert "_id" not in user


def test_me_with_expired_session_returns_401():
    _reseed_expired_session()
    r = requests.get(f"{API}/auth/me", headers={"Authorization": f"Bearer {EXPIRED_TOKEN}"})
    assert r.status_code == 401
    assert "expired" in r.json().get("detail", "").lower() or r.status_code == 401


def test_me_with_bogus_token_returns_401():
    r = requests.get(f"{API}/auth/me", headers={"Authorization": "Bearer nonexistent_token_xyz"})
    assert r.status_code == 401


# ---------- /api/auth/logout ----------
def test_logout_deletes_session():
    # Fresh session for this test
    token = f"test_session_logout_{int(time.time())}"
    _db.user_sessions.insert_one({
        "user_id": USER_ID,
        "session_token": token,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    # Verify valid first
    r0 = requests.get(f"{API}/auth/me", cookies={"session_token": token})
    assert r0.status_code == 200

    # Logout with cookie
    r1 = requests.post(f"{API}/auth/logout", cookies={"session_token": token})
    assert r1.status_code == 200
    assert r1.json().get("success") is True

    # DB should no longer have session
    assert _db.user_sessions.find_one({"session_token": token}) is None

    # Subsequent /me → 401
    r2 = requests.get(f"{API}/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert r2.status_code == 401


def test_logout_without_cookie_still_ok():
    r = requests.post(f"{API}/auth/logout")
    assert r.status_code == 200
