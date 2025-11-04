import { useRef } from "react";
import { type BaseNodeProps } from "./tree-renderer";
import { DroppableArea } from "./droppable-area";
import { TreeNodeActionsPortal } from "./tree-node-actions-portal";

interface ContainerNodeProps extends BaseNodeProps {
  children: React.ReactNode;
}

export function TreeNodeContainer({
  node,
  dragProps,
  effectiveHover,
  handleMouseEnter,
  handleMouseLeave,
  handleMouseDown,
  handleDelete,
  setIsActionsHovered,
  Component,
  children,
}: ContainerNodeProps) {
  const nodeRef = useRef<HTMLElement>(null);
  return (
    <>
      <DroppableArea
        ref={nodeRef}
        dragRef={dragProps.ref}
        nodeId={node.id}
        dragStyle={dragProps.style}
      >
        <Component
          ref={(el: HTMLElement | null) => {
            nodeRef.current = el;
          }}
          {...node.props}
          data-node-id={node.id}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDownCapture={handleMouseDown}
        >
          {children}
        </Component>
      </DroppableArea>
      <TreeNodeActionsPortal
        targetRef={nodeRef}
        node={node}
        isHovered={effectiveHover}
        setActivatorNodeRef={dragProps.setActivatorNodeRef}
        dragAttributes={dragProps.attributes}
        dragListeners={dragProps.listeners}
        isDragging={dragProps.isDragging}
        componentName={node.componentName}
        onDelete={handleDelete}
        onHoverChange={setIsActionsHovered}
      />
    </>
  );
}
