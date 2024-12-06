import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  MeshLine,
  MeshLineGeometry,
  MeshLineMaterial,
} from "./MeshLine/index.ts";

// function IcoSpherePoints({ index }: { index: number }) {
//   const pointsRef = useRef<THREE.Points>(null);
//   const offset = index * 0.01;
//   let elapsedTime = 0;
//   useFrame((_, dTime) => {
//     if (!pointsRef.current) return;

//     elapsedTime += dTime * 0.2;
//     pointsRef.current.rotation.x = elapsedTime + offset;
//     pointsRef.current.rotation.y = elapsedTime + offset;
//   });

//   const icoGeo = new THREE.IcosahedronGeometry(2, 4);
//   const colors = [];
//   const col = new THREE.Color();
//   const icoVerts = icoGeo.attributes.position;
//   const p = new THREE.Vector3();
//   for (let i = 0; i < icoVerts.count; i += 1) {
//     p.fromBufferAttribute(icoVerts, i);
//     const hue = 0.3 + p.x * 0.15;
//     const light = index * 0.015;
//     const { r, g, b } = col.setHSL(hue, 1.0, light);
//     colors.push(r, g, b);
//   }

//   const colorsBuffer = new Float32Array(colors);
//   // const sprite = useLoader(THREE.TextureLoader, "./circle.png");
//   const size = index * 0.0015;
//   return (
//     <points ref={pointsRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={icoVerts.count}
//           array={icoVerts.array}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attach="attributes-color"
//           count={icoVerts.count}
//           array={colorsBuffer}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         vertexColors
//         size={size}
//         // map={sprite}
//         alphaTest={0.5}
//         transparent={true}
//       />
//     </points>
//   );
// }

function getMeshLine(index: number) {
  const points = [];
  const numPoints = 300;
  for (let j = 0; j < numPoints; j += 1) {
    let x = -7.5 + j * 0.05;
    let y = Math.sin(j * 0.075);
    points.push(x, y, 0);
  }
  const geometry = new MeshLineGeometry();
  geometry.setPoints(points);
  const hue = 0.75 - index * 0.02;
  const lightness = 0.5 - index * 0.02;
  const color = new THREE.Color().setHSL(hue, 1.0, lightness);
  const material = new MeshLineMaterial({
    color,
    map: texLoader.load("./assets/strokes/stroke-02.png"),
    useMap: true,
    alphaTest: 0.5,
    transparent: true,
    resolution: new THREE.Vector2(w, h),
    lineWidth: 0.5,
    blending: THREE.AdditiveBlending,
  });

  const meshLine = new MeshLine(geometry, material);
  const offset = index * 10;
  const amplitude = 1;
  const waveLength = 0.015;
  meshLine.userData.update = function (t) {
    for (let p = 0, len = points.length; p < len; p += 3) {
      points[p + 1] = Math.sin((p - t + offset) * waveLength) * amplitude; // update y position only
    }
    geometry.setPoints(points, (p) => 1);
  };
  return meshLine;
}

export default function LinesGroup({
  tailLength = 40,
}: {
  tailLength?: number;
}) {
  const texLoader = new THREE.TextureLoader();

  const linesGroup = new THREE.Group();
  linesGroup.userData.update = function (t) {
    linesGroup.children.forEach((line) => line.userData.update(t));
  };
  const numLines = 15;
  for (let i = 0; i < numLines; i += 1) {
    const line = getMeshLine(i);
    line.position.y = i * 0.1;
    line.position.z = i * -0.3;
    linesGroup.add(line);
  }
  // const pointsN = tailLength > 0 && tailLength < 100 ? tailLength : 40;
  // const children = [];
  // for (let i = 0; i < pointsN; i += 1) {
  //   children.push(<IcoSpherePoints index={i} key={i} />);
  // }
  // return <group>{children}</group>;
}
