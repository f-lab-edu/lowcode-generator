import { GripVertical } from "lucide-react";

type DragHandleProps = {
  isHovered: boolean;
  attributes: any;
  listeners: any;
  componentName: string;
};

const DragHandle = ({
  isHovered,
  attributes,
  listeners,
  componentName,
}: DragHandleProps) => {
  return (
    <button
      className={`tree-node-drag-handle ${isHovered ? "hovered" : ""}`}
      {...attributes}
      {...listeners}
      aria-label={`${componentName} 드래그`}
      title="드래그하여 이동"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <GripVertical />
    </button>
  );
};

DragHandle.displayName = "DragHandle";

export { DragHandle };
