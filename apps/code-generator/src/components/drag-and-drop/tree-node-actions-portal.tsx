import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  type DraggableAttributes,
  type DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { GripVertical, Trash2, MousePointer2 } from "lucide-react";
import { type TreeNode } from "../../types";
import { useTreeStore } from "../../store/treeStore";

interface TreeNodeActionsPortalProps {
  targetRef: React.RefObject<HTMLElement | null>;
  node: TreeNode;
  isHovered: boolean;
  componentName: string;
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  dragAttributes?: DraggableAttributes;
  dragListeners?: DraggableSyntheticListeners;
  isDragging: boolean;
  onDelete?: () => void;
  onHoverChange?: (hovered: boolean) => void;
}

export function TreeNodeActionsPortal({
  targetRef,
  node,
  setActivatorNodeRef,
  isHovered,
  componentName,
  isDragging,
  dragAttributes,
  dragListeners,
  onDelete,
  onHoverChange,
}: TreeNodeActionsPortalProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isPortalHovered, setIsPortalHovered] = useState(false);
  const animationFrameRef = useRef<number>(0);

  const { selectedNode, setSelectedNode } = useTreeStore();

  // 실제로 보여야 하는지 판단 (원본 또는 Portal이 hover 상태)
  const shouldShow = isHovered || isPortalHovered;

  // 선택 여부
  const isSelected = selectedNode?.id === node.id;

  const onSelect = () => setSelectedNode(node);

  useEffect(() => {
    const updatePosition = () => {
      if (targetRef.current && shouldShow) {
        const rect = targetRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top + window.scrollY + rect.height / 2,
          left: rect.left - 14,
        });
      }
    };

    if (shouldShow) {
      updatePosition();
      const handleUpdate = () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(updatePosition);
      };

      window.addEventListener("scroll", handleUpdate, true);
      window.addEventListener("resize", handleUpdate);

      return () => {
        window.removeEventListener("scroll", handleUpdate, true);
        window.removeEventListener("resize", handleUpdate);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [targetRef, shouldShow]);

  // Portal hover 상태 변경 시 부모에게 알림
  useEffect(() => {
    if (onHoverChange) {
      onHoverChange(isPortalHovered);
    }
  }, [isPortalHovered, onHoverChange]);

  if (!shouldShow) return null;

  return createPortal(
    <div
      className="tree-node-actions-portal"
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translateY(-50%)",
        zIndex: 1000,
        pointerEvents: "auto",
      }}
      onMouseEnter={() => setIsPortalHovered(true)}
      onMouseLeave={() => setIsPortalHovered(false)}
    >
      <button
        className={`tree-node-select-btn ${isSelected ? "selected" : ""}`}
        onClick={onSelect}
        aria-label={`${componentName}선택`}
        title="선택"
      >
        <MousePointer2 />
      </button>
      {/* 드래그 핸들 */}
      <button
        ref={setActivatorNodeRef}
        className={`tree-node-drag-handle ${isDragging ? "dragging" : ""}`}
        {...dragAttributes}
        {...dragListeners}
        aria-label={`${componentName} 드래그`}
        title="드래그하여 이동"
      >
        <GripVertical />
      </button>
      {/* 삭제 버튼 */}
      {onDelete && (
        <button
          className="tree-node-delete-btn"
          onClick={onDelete}
          aria-label={`${componentName} 삭제`}
          title="삭제"
        >
          <Trash2 />
        </button>
      )}
    </div>,
    document.body
  );
}
