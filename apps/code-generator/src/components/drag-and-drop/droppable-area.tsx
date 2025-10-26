import { useDroppable } from "@dnd-kit/core";
import { cloneElement, isValidElement } from "react";
import "./droppable-area.css";

interface DroppableAreaProps {
  nodeId: string;
  children: React.ReactNode;
  disabled?: boolean;
  // Sortable drag props를 받아서 children에 merge
  dragRef?: any;
  dragAttributes?: any;
  dragListeners?: any;
  dragStyle?: React.CSSProperties;
}

const DroppableArea = ({
  nodeId,
  children,
  disabled,
  dragRef,
  dragAttributes,
  dragListeners,
  dragStyle,
}: DroppableAreaProps) => {
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

  const childElement = children as React.ReactElement<any>;

  // ref 병합 함수 (droppable, draggable 등 여러 ref가 있을 수 있기 때문에 ref 충돌을 위한 병합이 필요)
  const mergedRef = (node: HTMLElement | null) => {
    // 먼저 sortable 등록
    if (dragRef) {
      if (typeof dragRef === "function") dragRef(node);
      else if (dragRef.current != null) dragRef.current = node;
    }
    // 마지막에 droppable 등록
    setNodeRef(node);
  };

  // 기존 props와 droppable + drag props 병합
  const mergedProps = {
    ref: mergedRef,
    "data-droppable": true,
    "data-droppable-over": isOver,
    className: [
      childElement.props.className,
      "droppable-area",
      isOver ? "drag-over" : "",
    ]
      .filter(Boolean)
      .join(" "),
    style: {
      ...childElement.props.style,
      ...dragStyle,
    },
    // drag attributes와 listeners 추가
    ...(dragAttributes || {}),
    ...(dragListeners || {}),
  };

  // children에 merged props 주입
  return cloneElement(childElement, mergedProps);
};

DroppableArea.displayName = "DroppableArea";

export { DroppableArea };
