'use client'

import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

const Earth: React.FC = () => {
  const earthRef = useRef<THREE.Mesh>(null);

  const earthTexture = useLoader(THREE.TextureLoader, '/earth.jpg'); // Assuming the texture is in the public folder

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = state.mouse.x * Math.PI;
      earthRef.current.rotation.x = state.mouse.y * Math.PI;
    }
  });

  return (
    <mesh ref={earthRef} scale={2}>
      {/* Geometry for the Earth (sphere) */}
      <sphereGeometry args={[1, 32, 32]} />
      {/* Apply texture to the sphere */}
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
};

const Scene: React.FC = () => {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      {/* Earth Model */}
      <Earth />
    </Canvas>
  );
};

const ThreeDModelPage: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Scene />
    </div>
  );
};

export default ThreeDModelPage;

