import * as THREE from "three";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial, raycast } from "meshline";
import { Object3DNode, MaterialNode } from "@react-three/fiber";
import { useRef } from "react";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
    meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
  }
}

const initPoints = (numPoints: number) => {
  const points: number[] = [];
  for (let j = 0; j < numPoints; j += 1) {
    const x = -7.5 + j * 0.05;
    const y = Math.sin(j * 0.075);
    points.push(x, y, 0);
  }
  return points;
};

export default function MeshLine({
  index,
  posY,
  posZ,
  amplitude,
  waveLength,
  waveSpeed,
  offsetMult,
  hueStart,
  hueMult,
  lightnessStart,
  lightnessMult,
}: {
  index: number;
  posY: number;
  posZ: number;
  amplitude: number;
  waveLength: number;
  waveSpeed: number;
  offsetMult: number;
  hueStart: number;
  hueMult: number;
  lightnessStart: number;
  lightnessMult: number;
}) {
  const sprite = useLoader(THREE.TextureLoader, "./stroke-00.png");

  const meshLineGeometryRef = useRef<MeshLineGeometry>(null);

  // generating points for the meshline
  const points = useRef<number[]>(initPoints(300));

  // colors
  const hue = hueStart - index * hueMult;
  const lightness = lightnessStart - index * lightnessMult;
  const color = new THREE.Color().setHSL(hue, 1.0, lightness);

  // window resolution
  const w = window.innerWidth;
  const h = window.innerHeight;

  // animation
  const offset = index * offsetMult;
  // const amplitude = 1;
  // const waveLength = 0.015;
  // const waveSpeed = 200;
  let elapsedTime = 0;
  useFrame((_, dTime) => {
    if (!meshLineGeometryRef.current) return;
    elapsedTime += dTime * waveSpeed;

    for (let p = 0, len = points.current.length; p < len; p += 3) {
      points.current[p + 1] =
        Math.sin((p - elapsedTime + offset) * waveLength) * amplitude; // update y position only
    }
    meshLineGeometryRef.current.setPoints(points.current);
  });

  return (
    <mesh raycast={raycast} position={new THREE.Vector3(0, posY, posZ)}>
      <meshLineGeometry ref={meshLineGeometryRef} />
      <meshLineMaterial
        lineWidth={0.5}
        color={color}
        map={sprite}
        useMap={1}
        alphaTest={0.5}
        transparent
        // blending={THREE.AdditiveBlending}
        resolution={new THREE.Vector2(w, h)}
      />
    </mesh>
  );
}
