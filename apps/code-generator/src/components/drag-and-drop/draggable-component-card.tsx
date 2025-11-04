import { type MouseEvent } from "react";
import { useDraggable } from "@dnd-kit/core";
import { getDefaultProps } from "../../utils/getDefaultProps";
import {
  ComponentPreview,
  type ComponentPreviewProps,
} from "./component-preview";

export interface ComponentCardProps extends ComponentPreviewProps {
  onClick?: () => void;
  isSelected?: boolean;
}

export function DraggableComponentCard({
  componentName,
  component,
  meta,
  onClick,
  isSelected,
}: ComponentCardProps) {
  const defaultProps = getDefaultProps(componentName);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-item-${componentName}`,
    data: {
      type: "palette-item",
      componentName: componentName,
      props: defaultProps,
      meta,
    },
  });

  const handleClick = (e: MouseEvent) => {
    if (!isDragging && onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <div
      className={`component-card ${isDragging ? "dragging" : ""} ${
        isSelected ? "selected" : ""
      }`}
      ref={setNodeRef}
      style={{ opacity: isDragging ? 0.3 : 1 }}
      onClick={handleClick}
      {...listeners}
      {...attributes}
    >
      {/* 미니 프리뷰 - 실제로 렌더링 */}
      <ComponentPreview
        componentName={componentName}
        component={component}
        meta={meta}
      />
      <span className="component-name">{meta.component}</span>
    </div>
  );
}
