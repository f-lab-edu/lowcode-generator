import { ReactFlow, useNodesState, useEdgesState } from "@xyflow/react";
import { useTreeFlow } from "../../hooks/useTreeFlow";
import "@xyflow/react/dist/style.css";
import { CustomEdge } from "./custom-edge";

export function TreeView() {
  const edgeTypes = {
    "straight-edge": CustomEdge,
  };

  const { nodes: layoutNodes, edges: layoutEdges } = useTreeFlow();
  const [nodes, , onNodesChange] = useNodesState(layoutNodes);
  const [edges, , onEdgesChange] = useEdgesState(layoutEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      edgeTypes={edgeTypes}
      fitView
    />
  );
}
