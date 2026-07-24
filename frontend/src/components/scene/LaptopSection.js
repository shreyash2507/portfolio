import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { useAuth } from "../../context/AuthContext";
import { Laptop } from "./Laptop";
import { Books } from "./Books";
import { BookPanel } from "./BookPanel";

const CameraRig = ({ progress }) => {
  const { camera } = useThree();
  useFrame((state, delta) => {
    const p = progress.get();
    const tz = THREE.MathUtils.lerp(8.4, 7.0, Math.min(p * 1.6, 1));
    const ty = THREE.MathUtils.lerp(3.0, 2.2, Math.min(p * 1.6, 1));
    camera.position.z = THREE.MathUtils.damp(camera.position.z, tz, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, 3, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, state.pointer.x * 0.25, 2, delta);
    camera.lookAt(0.3, 0.9, 0);
  });
  return null;
};

const SceneContents = ({ progress, activeBook, onSelect, activeProject, onCloseProject, auth }) => (
  <>
    <ambientLight intensity={0.85} />
    <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
    <directionalLight position={[-5, 4, -2]} intensity={0.5} color="#e8e4da" />
    <spotLight position={[0, 7, 2]} angle={0.5} penumbra={1} intensity={0.8} />
    <group position={[-0.7, 0, 0]}>
      <Laptop progress={progress} activeProject={activeProject} onCloseProject={onCloseProject} auth={auth} />
      <Books activeBook={activeBook} onSelect={onSelect} />
      <ContactShadows position={[0.9, 0, 0]} opacity={0.4} scale={12} blur={2.4} far={3} />
    </group>
  </>
);

export const LaptopSection = ({ activeProject, onCloseProject }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const [activeBook, setActiveBook] = useState(null);
  // Auth is read here (main React tree) and passed as props — drei <Html> renders
  // in a separate root, so context does not cross into the laptop screen.
  const { user, login, logout } = useAuth();

  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);

  return (
    <section ref={sectionRef} id="machine" data-testid="laptop-3d-section" className="relative h-[350vh]">
      {/* fixed stage: the canvas never moves in the viewport, so the screen UI can never drift */}
      <div className="fixed inset-0 h-screen w-full bg-[#eae9e5] dark:bg-[#151513] transition-colors duration-300" style={{ zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 3.0, 8.4], fov: 35 }}
          dpr={[1, 1.75]}
          shadows
          data-testid="laptop-canvas"
        >
          <Suspense fallback={null}>
            <SceneContents
              progress={scrollYProgress}
              activeBook={activeBook}
              onSelect={setActiveBook}
              activeProject={activeProject}
              onCloseProject={onCloseProject}
              auth={{ user, login, logout }}
            />
            <CameraRig progress={scrollYProgress} />
          </Suspense>
        </Canvas>

        <motion.div
          style={{ opacity: hintOpacity }}
          data-testid="scene-scroll-hint"
          className="absolute top-24 left-6 md:left-12 pointer-events-none"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#8a8a85]">Ch. 00 — The Machine</p>
          <h2 className="font-display text-3xl md:text-4xl mt-3 max-w-sm leading-tight">
            Keep scrolling. <span className="italic text-[#8a8a85]">It opens for you.</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: labelOpacity }}
          data-testid="scene-books-hint"
          className="absolute bottom-12 right-6 md:right-12 pointer-events-none text-right"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#8a8a85]">The Library</p>
          <p className="font-display text-xl md:text-2xl mt-2 italic">Click a book — each one is a chapter of me.</p>
        </motion.div>

        <AnimatePresence>
          {activeBook && <BookPanel book={activeBook} onClose={() => setActiveBook(null)} />}
        </AnimatePresence>
      </div>
    </section>
  );
};
