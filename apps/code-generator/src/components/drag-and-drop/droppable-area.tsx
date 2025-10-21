import { useDroppable } from "@dnd-kit/core";
import { cloneElement, isValidElement } from "react";
import "./droppable-area.css";

interface DroppableAreaProps {
  nodeId: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const DroppableArea = ({ nodeId, children, disabled }: DroppableAreaProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: nodeId,
    disabled,
    data: {
      type: "drop-area",
      nodeId,
    },
  });

  // Hover Debug
  if (isOver) {
    console.log(`Hovering over droppable: ${nodeId}`);
  }

  // children이 유효한 React element인지 확인
  if (!isValidElement(children)) {
    console.warn("DroppableArea: children must be a valid React element");
    return children;
  }

  // 기존 props와 droppable 관련 props 병합
  const droppableProps = {
    ref: setNodeRef,
    "data-droppable": true,
    "data-droppable-over": isOver,
    className: [
      children.props.className,
      "droppable-area",
      isOver ? "drag-over" : "",
    ]
      .filter(Boolean)
      .join(" "),
  };

  // children에 droppable props 주입
  return cloneElement(children, droppableProps);
};

DroppableArea.displayName = "DroppableArea";

export { DroppableArea };
