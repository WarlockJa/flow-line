import MeshLine from "./MeshLine";

export default function Lines(controls: Controls) {
  const content = [];
  for (let i = 0; i < controls.linesNum; i += 1) {
    content.push(
      <MeshLine
        key={i}
        index={i}
        posY={i * controls.posYmult}
        posZ={i * controls.posZmult}
        {...controls}
      />
    );
  }
  return content;
}
