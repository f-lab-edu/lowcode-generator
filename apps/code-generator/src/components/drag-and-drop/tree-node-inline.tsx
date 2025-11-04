import { useRef, type CSSProperties } from "react";
import { type BaseNodeProps } from "./tree-renderer";
import { TreeNodeActionsPortal } from "./tree-node-actions-portal";

export function TreeNodeInline({
  node,
  dragProps,
  effectiveHover,
  handleMouseEnter,
  handleMouseLeave,
  handleMouseDown,
  handleDelete,
  setIsActionsHovered,
  Component,
}: BaseNodeProps) {
  const nodeRef = useRef<HTMLElement>(null);
  return (
    <>
      <Component
        {...node.props}
        ref={(el: HTMLElement | null) => {
          if (dragProps.ref) dragProps.ref(el);
          nodeRef.current = el;
        }}
        style={{
          ...dragProps.style,
          ...((node.props.style as CSSProperties) || {}),
        }}
        data-node-id={node.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDownCapture={handleMouseDown}
      />
      <TreeNodeActionsPortal
        targetRef={nodeRef}
        node={node}
        isHovered={effectiveHover}
        componentName={node.componentName}
        setActivatorNodeRef={dragProps.setActivatorNodeRef}
        isDragging={dragProps.isDragging}
        dragAttributes={dragProps.attributes}
        dragListeners={dragProps.listeners}
        onDelete={handleDelete}
        onHoverChange={setIsActionsHovered}
      />
    </>
  );
}
