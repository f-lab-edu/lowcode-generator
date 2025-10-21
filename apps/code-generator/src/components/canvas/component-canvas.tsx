import { useDroppable } from "@dnd-kit/core";
import { TreeRenderer } from "../drag-and-drop/tree-renderer";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import "./component-canvas.css";

export function ComponentCanvas() {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-root",
    data: { type: "canvas-root" },
  });

  const { tree } = useDragAndDrop();

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
