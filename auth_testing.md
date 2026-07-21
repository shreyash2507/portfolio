# Auth-Gated App Testing Playbook (Emergent Google Auth)

## Step 1: Create Test User & Session
```bash
mongosh --eval "
use('test_database');
var userId = 'test-user-' + Date.now();
var sessionToken = 'test_session_' + Date.now();
db.users.insertOne({
  user_id: userId,
  email: 'test.user.' + Date.now() + '@example.com',
  name: 'Test User',
  picture: 'https://via.placeholder.com/150',
  created_at: new Date()
});
db.user_sessions.insertOne({
  user_id: userId,
  session_token: sessionToken,
  expires_at: new Date(Date.now() + 7*24*60*60*1000),
  created_at: new Date()
});
print('Session token: ' + sessionToken);
print('User ID: ' + userId);
"
```

## Step 2: Test Backend API
```bash
curl -X GET "https://<app>/api/auth/me" -H "Authorization: Bearer YOUR_SESSION_TOKEN"
```

## Step 3: Browser Testing
```python
await page.context.add_cookies([{
    "name": "session_token",
    "value": "YOUR_SESSION_TOKEN",
    "domain": "<app-domain>",
    "path": "/",
    "httpOnly": True,
    "secure": True,
    "sameSite": "None"
}])
await page.goto("https://<app>")
```

## Quick Debug / Cleanup
```bash
mongosh --eval "
use('test_database');
db.users.deleteMany({email: /test\.user\./});
db.user_sessions.deleteMany({session_token: /test_session/});
"
```

## Checklist
- User document has `user_id` (custom UUID); all queries use `{"_id": 0}` projection
- Session `user_id` matches user's `user_id`
- /api/auth/me returns user data (not 401)
- Cookie auth first, Authorization Bearer fallback

## Success Indicators
- /api/auth/me returns user data
- Signed-in state renders without redirect

## App-specific notes
- Single-page portfolio. Login UI is on the 3D laptop screen (scroll to window.innerHeight*2.6, wait ~3s for Lenis).
- Google button: data-testid="google-signin-button" (inside drei Html on canvas).
- Signed-in view: data-testid="login-signedin-screen", logout: data-testid="logout-button".
- Session exchange endpoint: POST /api/auth/session with X-Session-ID header.
