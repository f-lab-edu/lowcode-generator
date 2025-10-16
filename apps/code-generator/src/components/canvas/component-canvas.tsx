import { useDroppable } from "@dnd-kit/core";
import { type TreeNode } from "../../types";
import { TreeRenderer } from "../drag-and-drop/tree-renderer";
import "./component-canvas.css";

export function ComponentCanvas({ tree }: { tree: TreeNode[] }) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-root",
    data: { type: "canvas-root" },
  });

  return (
    <div
      ref={setNodeRef}
      className={`component-canvas ${isOver ? "drag-over" : ""}`}
    >
      {tree.length === 0 ? (
        <div className="empty-canvas">Drag components from the palette</div>
      ) : (
        <TreeRenderer nodes={tree} />
      )}
    </div>
  );
}
