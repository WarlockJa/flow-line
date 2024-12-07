import { useState } from "react";

export default function ControlsBar({
  controls,
  setControls,
}: {
  controls: Controls;
  setControls: (newControls: Controls) => void;
}) {
  const [showControls, setShowControls] = useState(false);
  return (
    <div className="fixed top-0 left-0 right-0 p-4 z-20 w-60">
      <button
        onClick={() => setShowControls(!showControls)}
        className="border-2 rounded-md p-2 bg-slate-600/20 hover:bg-slate-600/80 transition-colors"
      >
        {showControls ? "<<" : ">>"}
      </button>
      <div
        className="flex gap-8 flex-col transition-transform mt-8 max-h-[90vh] overflow-y-scroll"
        style={showControls ? undefined : { transform: `translateX(-400px)` }}
      >
        <div className="flex flex-col ">
          <label htmlFor="linesNum">Lines Number: {controls.linesNum}</label>
          <input
            type="range"
            min={1}
            max={25}
            id="linesNum"
            value={controls.linesNum}
            onChange={(e) =>
              setControls({
                ...controls,
                linesNum: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="amplitude">Amplitude: {controls.amplitude}</label>
          <input
            type="range"
            min={0}
            max={3}
            step={0.1}
            id="amplitude"
            value={controls.amplitude}
            onChange={(e) =>
              setControls({
                ...controls,
                amplitude: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="waveLength">Wave Length: {controls.waveLength}</label>
          <input
            type="range"
            min={0}
            max={3}
            step={0.001}
            id="waveLength"
            value={controls.waveLength}
            onChange={(e) =>
              setControls({
                ...controls,
                waveLength: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="waveSpeed">Wave Speed: {controls.waveSpeed}</label>
          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            id="waveSpeed"
            value={controls.waveSpeed}
            onChange={(e) =>
              setControls({
                ...controls,
                waveSpeed: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="offsetMult">Offset: {controls.offsetMult}</label>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            id="offsetMult"
            value={controls.offsetMult}
            onChange={(e) =>
              setControls({
                ...controls,
                offsetMult: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="hueStart">Hue Start: {controls.hueStart}</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            id="hueStart"
            value={controls.hueStart}
            onChange={(e) =>
              setControls({
                ...controls,
                hueStart: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="hueMult">Hue Multiplier: {controls.hueMult}</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            id="hueMult"
            value={controls.hueMult}
            onChange={(e) =>
              setControls({
                ...controls,
                hueMult: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lightnessStart">
            Lightness Start: {controls.lightnessStart}
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            id="lightnessStart"
            value={controls.lightnessStart}
            onChange={(e) =>
              setControls({
                ...controls,
                lightnessStart: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lightnessMult">
            Lightness Multiplier: {controls.lightnessMult}
          </label>
          <input
            type="range"
            min={0}
            max={0.5}
            step={0.01}
            id="lightnessMult"
            value={controls.lightnessMult}
            onChange={(e) =>
              setControls({
                ...controls,
                lightnessMult: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="posYmult">
            Position Y Multiplier: {controls.posYmult}
          </label>
          <input
            type="range"
            min={-1}
            max={1}
            step={0.01}
            id="posYmult"
            value={controls.posYmult}
            onChange={(e) =>
              setControls({
                ...controls,
                posYmult: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="posZmult">
            Position Z Multiplier: {controls.posZmult}
          </label>
          <input
            type="range"
            min={-1}
            max={1}
            step={0.01}
            id="posZmult"
            value={controls.posZmult}
            onChange={(e) =>
              setControls({
                ...controls,
                posZmult: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="sprite">Texture Sprite: {controls.sprite}</label>
          <input
            type="range"
            min={1}
            max={6}
            step={1}
            id="sprite"
            value={controls.sprite}
            onChange={(e) =>
              setControls({
                ...controls,
                sprite: Number(e.target.value),
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
