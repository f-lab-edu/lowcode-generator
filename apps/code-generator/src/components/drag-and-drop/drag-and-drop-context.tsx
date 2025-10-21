import { DndContext } from "@dnd-kit/core";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { debugCollisionDetection } from "../../utils/collisionDetection";
import { DragComponentOverlay } from "./drag-component-overlay";

/**
 * Drag and Drop 컨텍스트
 */
const DragAndDropContext = ({ children }: { children: React.ReactNode }) => {
  const { handleDragStart, handleDragEnd, activeDrag } = useDragAndDrop();
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={debugCollisionDetection}
    >
      {children}
      <DragComponentOverlay activeDrag={activeDrag} />
    </DndContext>
  );
};

DragAndDropContext.displayName = "DragAndDropContext";

export { DragAndDropContext };
