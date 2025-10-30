import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";

export type ComponentNodeData = {
  label: string;
  meta?: string;
  className?: string;
  props?: Record<string, unknown>;
};

export function ComponentNode({ data }: NodeProps<Node<ComponentNodeData>>) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 6,
        padding: "6px 12px",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        fontSize: 12,
        textAlign: "center",
      }}
    >
      {data.label}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
