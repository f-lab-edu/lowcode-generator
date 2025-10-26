import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type TreeNode } from "../types";
import { getComponentMeta } from "@packages/ui";

export const useSortableDragAndHover = (rootNode: TreeNode) => {
  const [isHovered, setIsHovered] = useState(false);
  const meta = getComponentMeta(rootNode.componentName);
  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: rootNode.id,
    data: {
      type: "tree-node",
      componentName: rootNode.componentName,
      props: rootNode.props,
      meta: meta,
      rootNode,
      canHaveChildren: meta?.hasChildren,
    },
  });

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  /**
   * Mouse Down시 바로 drag and drop 모드가 되지 않도록 stop propagation
   * @param e
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = e.target as HTMLElement;
    if (
      el.tagName === "INPUT" ||
      el.tagName === "BUTTON" ||
      el.tagName === "TEXTAREA" ||
      el.closest("input") ||
      el.closest("button")
    ) {
      e.stopPropagation();
    }
  };

  return {
    isHovered,
    setIsHovered,
    dragProps: {
      ref: setSortableRef,
      attributes,
      listeners,
      style: { position: "relative" as const, ...dragStyle },
    },
    handleMouseDown,
  };
};
