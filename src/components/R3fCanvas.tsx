import * as THREE from "three";
import { useState } from "react";
import ControlsBar from "./ControlsBar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Lines from "./Lines";

const defaultControls: Controls = {
  tailLength: 40,
};

export default function R3fCanvas() {
  const [controls, setControls] = useState<Controls>(defaultControls);

  return (
    <>
      {/* <ControlsBar controls={controls} setControls={setControls} /> */}
      <Canvas gl={{ toneMapping: THREE.NoToneMapping }}>
        <Stars />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            height={300}
            mipmapBlur
          />
        </EffectComposer>
        <Lines lines={15} />
        <hemisphereLight args={[0xffffff, 0x000000, 1.0]} />
        <OrbitControls />
      </Canvas>
    </>
  );
}
