import {
  type ComponentType,
  type ComponentName,
  type ComponentMeta,
  getComponentMeta,
} from "@packages/ui";
import { useDraggable } from "@dnd-kit/core";

function getDefaultProps(name: ComponentName): Record<string, unknown> {
  const meta = getComponentMeta(name);

  if (!meta?.props) {
    return {};
  }

  return Object.entries(meta.props).reduce((acc, [propName, propMeta]) => {
    // default 값이 있으면 사용, 없으면 control type에 따라 기본값 설정
    if (propMeta.default !== undefined) {
      acc[propName] = propMeta.default;
    } else {
      // default가 없을 때 control type별 fallback
      switch (propMeta.control) {
        case "boolean":
          acc[propName] = false;
          break;
        case "number":
          acc[propName] = 0;
          break;
        case "select":
          // options의 첫 번째 값 사용
          acc[propName] = propMeta.options?.[0] ?? "";
          break;
        default:
          acc[propName] = "";
      }
    }
    return acc;
  }, {} as Record<string, unknown>);
}

export type ComponentCardProps = {
  name: ComponentName;
  component: ComponentType;
  meta: ComponentMeta;
};

export function DraggableComponentCard({
  name,
  component,
  meta,
}: ComponentCardProps) {
  const defaultProps = getDefaultProps(name);

  const Component = component;

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-item-${name}`,
    data: {
      type: "palette-item",
      componentName: name,
      props: defaultProps,
      meta,
    },
  });

  return (
    <div
      className={`component-card ${isDragging ? "dragging" : ""}`}
      ref={setNodeRef}
      style={{ opacity: isDragging ? 0.3 : 1 }}
      {...listeners}
      {...attributes}
    >
      {/* 미니 프리뷰 - 실제로 렌더링 */}
      <div className="thumbnail">
        <div className="mini-preview">
          {meta.renderPreview ? (
            meta.renderPreview(Component, defaultProps)
          ) : meta.hasChildren ? (
            <Component {...defaultProps} {...listeners} {...attributes}>
              Preview
            </Component>
          ) : (
            <Component {...defaultProps} {...listeners} {...attributes} />
          )}
        </div>
      </div>

      <span className="component-name">{meta.component}</span>
    </div>
  );
}
