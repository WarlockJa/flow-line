import MeshLine from "./MeshLine";

export default function Lines({ lines = 15 }: { lines?: number }) {
  const content = [];
  for (let i = 0; i < lines; i += 1) {
    content.push(<MeshLine key={i} index={i} posY={i * 0.1} posZ={i * -0.3} />);
  }
  return content;
}
