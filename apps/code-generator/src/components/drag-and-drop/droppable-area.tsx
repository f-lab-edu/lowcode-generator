import { useDroppable } from "@dnd-kit/core";

const DroppableArea = ({
  nodeId,
  children,
}: {
  nodeId: string;
  children: React.ReactNode;
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: nodeId,
    data: {
      type: "drop-area",
      nodeId,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`droppable-area ${isOver ? "drag-over" : ""}`}
      style={{ display: "contents" }}
    >
      {children}
    </div>
  );
};

DroppableArea.displayName = "DroppableArea";

export { DroppableArea };
