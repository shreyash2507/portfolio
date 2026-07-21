import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { ScreenLogin } from "./ScreenLogin";
import { ProjectPreview } from "./ProjectPreview";

const ALU = "#d8d8d4";
const DARK = "#1c1c1a";

export const Laptop = ({ progress, activeProject, onCloseProject, auth }) => {
  const lidRef = useRef();
  const screenHtmlRef = useRef();
  const glassMatRef = useRef();
  const open = useRef(0);

  useFrame((_, delta) => {
    const p = progress.get();
    const scrollTarget = THREE.MathUtils.clamp((p - 0.08) / 0.55, 0, 1);
    const target = activeProject ? 1 : scrollTarget;
    open.current = THREE.MathUtils.damp(open.current, target, 4, delta);
    if (lidRef.current) {
      lidRef.current.rotation.x = THREE.MathUtils.lerp(0, -Math.PI * 0.62, open.current);
    }
    if (screenHtmlRef.current) {
      const vis = THREE.MathUtils.clamp((open.current - 0.55) / 0.4, 0, 1);
      screenHtmlRef.current.style.opacity = vis;
      screenHtmlRef.current.style.pointerEvents = vis > 0.8 ? "auto" : "none";
    }
    if (glassMatRef.current) {
      const targetGlow = activeProject ? 1.4 : 0.35;
      glassMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        glassMatRef.current.emissiveIntensity, targetGlow, 3, delta
      );
    }
  });

  return (
    <group position={[0, 0.001, 0]}>
      {/* base */}
      <RoundedBox args={[3.1, 0.14, 2.1]} radius={0.04} smoothness={4} position={[0, 0.07, 0]} castShadow>
        <meshStandardMaterial color={ALU} metalness={0.6} roughness={0.35} />
      </RoundedBox>
      {/* keyboard well */}
      <mesh position={[0, 0.145, 0.12]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[2.7, 1.15]} />
        <meshStandardMaterial color="#c4c4c0" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* keys */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <mesh key={`${row}-${col}`} position={[-1.21 + col * 0.22, 0.155, -0.32 + row * 0.19]}>
            <boxGeometry args={[0.18, 0.02, 0.15]} />
            <meshStandardMaterial color={DARK} roughness={0.7} />
          </mesh>
        ))
      )}
      {/* trackpad */}
      <mesh position={[0, 0.148, 0.78]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1.1, 0.55]} />
        <meshStandardMaterial color="#cfcfcb" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* lid group — hinge at back edge */}
      <group ref={lidRef} position={[0, 0.16, -1.0]}>
        <RoundedBox args={[3.1, 0.09, 2.1]} radius={0.04} smoothness={4} position={[0, 0.045, 1.02]} castShadow>
          <meshStandardMaterial color={ALU} metalness={0.65} roughness={0.3} />
        </RoundedBox>
        {/* screen bezel (inner face, faces down when closed) */}
        <mesh position={[0, -0.002, 1.02]} rotation-x={Math.PI / 2}>
          <planeGeometry args={[2.94, 1.94]} />
          <meshStandardMaterial color="#0d0d0c" roughness={0.9} />
        </mesh>
        {/* screen glass — glows when a project is on screen */}
        <mesh position={[0, -0.006, 1.02]} rotation-x={Math.PI / 2}>
          <planeGeometry args={[2.78, 1.78]} />
          <meshStandardMaterial
            ref={glassMatRef}
            color="#101012"
            emissive={activeProject ? "#d8cfae" : "#2a2a30"}
            emissiveIntensity={0.35}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
        <Html
          transform
          position={[0, -0.02, 1.02]}
          rotation-x={Math.PI / 2}
          scale={0.115}
          wrapperClass="laptop-screen-wrapper"
          zIndexRange={[10, 0]}
        >
          <div
            ref={screenHtmlRef}
            style={{
              opacity: 0,
              borderRadius: 8,
              boxShadow: activeProject ? "0 0 90px 18px rgba(216, 207, 174, 0.55)" : "none",
              transition: "box-shadow 0.8s ease",
            }}
          >
            {activeProject ? (
              <ProjectPreview project={activeProject} onClose={onCloseProject} />
            ) : (
              <ScreenLogin auth={auth} />
            )}
          </div>
        </Html>
      </group>
    </group>
  );
};
