import { useState } from "react";
import { ReactFlow, type Node } from "@xyflow/react";
import { useTreeFlow } from "../../hooks/useTreeFlow";
import { CustomEdge } from "./component-edge";
import { ComponentNode } from "./component-node";
import { ComponentInspector } from "./component-inspector";
import "@xyflow/react/dist/style.css";
import "./tree-view.css";

const edgeTypes = {
  "component-edge": CustomEdge,
};

const nodeTypes = {
  "component-node": ComponentNode,
};

export function TreeView() {
  const { nodes, edges } = useTreeFlow();
  const [hidden, setHidden] = useState<boolean>(false);
  const [selectedComponent, setSelectedComponent] = useState<Node | null>(null);

  return (
    <div className="tree-view">
      <div className="component-tree-flow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={(_, node) => setSelectedComponent(node)}
          edgeTypes={edgeTypes}
          nodeTypes={nodeTypes}
          fitView
        />
      </div>
      <button className="close-button" onClick={() => setHidden(!hidden)}>
        {hidden ? "열기" : "닫기"}
      </button>
      <div className={`component-inspector ${hidden && "hide"}`}>
        <ComponentInspector node={selectedComponent} />
      </div>
    </div>
  );
}
