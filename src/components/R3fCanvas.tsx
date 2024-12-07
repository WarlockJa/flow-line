import * as THREE from "three";
import { useState } from "react";
import ControlsBar from "./ControlsBar";
import { Canvas } from "@react-three/fiber";
import { Cloud, Clouds, OrbitControls, Stars } from "@react-three/drei";
import Lines from "./Lines";

const defaultControls: Controls = {
  linesNum: 15,
  posYmult: 0.1,
  posZmult: -0.3,
  amplitude: 1,
  hueStart: 0,
  hueMult: 0.06,
  lightnessStart: 0.5,
  lightnessMult: 0.02,
  offsetMult: 10,
  waveLength: 0.015,
  waveSpeed: 200,
  sprite: 2,
};

export default function R3fCanvas() {
  const [controls, setControls] = useState<Controls>(defaultControls);

  return (
    <>
      <ControlsBar controls={controls} setControls={setControls} />
      <Canvas gl={{ toneMapping: THREE.NoToneMapping }}>
        <Stars />
        <Clouds material={THREE.MeshBasicMaterial}>
          <Cloud seed={2} scale={2} volume={5} fade={100} color={"#694269"} />
        </Clouds>
        {/* <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            height={300}
            mipmapBlur
          />
        </EffectComposer> */}
        <Lines {...controls} />
        <hemisphereLight args={[0xffffff, 0x000000, 1.0]} />
        <OrbitControls />
      </Canvas>
    </>
  );
}
