import { useDroppable } from "@dnd-kit/core";
import { TreeRenderer } from "../drag-and-drop/tree-renderer";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useZoom } from "../../hooks/useZoom";
import { ZoomControl } from "./zoom-control";
import "./component-canvas.css";

export function ComponentCanvas() {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-root",
    data: { type: "canvas-root", id: "canvas-root" },
  });

  const { tree } = useDragAndDrop();
  const { scale, handleWheel, zoomIn, zoomOut, resetZoom } = useZoom();

  const innerCanvasStyle = {
    transform: `scale(${scale})`,
    transformOrigin: "top left",
    transition: "transform 0.1s ease-out",
  };

  return (
    <div
      ref={setNodeRef}
      onWheel={handleWheel}
      className={`component-canvas ${isOver ? "drag-over" : ""}`}
    >
      <div className="canvas-inner" style={innerCanvasStyle}>
        {tree.length === 0 ? (
          <div className="empty-canvas">Drag components from the palette</div>
        ) : (
          <TreeRenderer nodes={tree} />
        )}
      </div>
      <ZoomControl
        scale={scale}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={resetZoom}
      />
    </div>
  );
}
