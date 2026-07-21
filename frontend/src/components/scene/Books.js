import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { BOOKS } from "../../data/portfolio";

const Book = ({ book, index, position, lean = 0, active, onSelect }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const height = 1.15 - index * 0.05;

  useFrame((_, delta) => {
    if (!ref.current) return;
    const targetY = position[1] + (hovered || active ? 0.18 : 0);
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, targetY, 6, delta);
  });

  return (
    <group
      ref={ref}
      position={position}
      rotation-z={lean}
      onClick={(e) => { e.stopPropagation(); onSelect(book); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
    >
      <mesh castShadow>
        <boxGeometry args={[0.2, height, 0.82]} />
        <meshStandardMaterial color={book.color} roughness={0.65} />
      </mesh>
      {/* pages */}
      <mesh position={[0, 0, -0.015]}>
        <boxGeometry args={[0.17, height - 0.06, 0.78]} />
        <meshStandardMaterial color="#efece4" roughness={0.9} />
      </mesh>
      <Text
        position={[0, 0, 0.425]}
        rotation-z={-Math.PI / 2}
        fontSize={book.spine.length > 10 ? 0.062 : 0.085}
        letterSpacing={book.spine.length > 10 ? 0.08 : 0.15}
        color={book.textColor}
        anchorX="center"
        anchorY="middle"
      >
        {book.spine}
      </Text>
    </group>
  );
};

export const Books = ({ activeBook, onSelect }) => (
  <group position={[2.35, 0, 0.15]} rotation-y={-0.35}>
    {BOOKS.slice(0, 3).map((book, i) => (
      <Book
        key={book.id}
        book={book}
        index={i}
        position={[i * 0.24, (1.15 - i * 0.05) / 2, 0]}
        active={activeBook?.id === book.id}
        onSelect={onSelect}
      />
    ))}
    {/* leaning book */}
    <Book
      book={BOOKS[3]}
      index={3}
      position={[0.82, 0.54, 0]}
      lean={-0.26}
      active={activeBook?.id === BOOKS[3].id}
      onSelect={onSelect}
    />
  </group>
);
