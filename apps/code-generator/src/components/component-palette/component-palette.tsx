import {
  ComponentRegistry,
  ComponentsByCategory,
  getComponentMeta,
  type ComponentName,
} from "@packages/ui";
import { useState } from "react";
import "./component-palette.css";
import { useDraggable } from "@dnd-kit/core";

export function ComponentPalette() {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="palette">
      <div className="palette-content">
        {Object.entries(ComponentsByCategory).map(([category, components]) => (
          <div key={category} className="category" data-category={category}>
            <h4
              className={`category-title ${
                openCategories[category] ? "open" : ""
              }`}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </h4>
            <div
              className={`category-content ${
                openCategories[category] ? "open" : ""
              }`}
            >
              <div className="component-grid">
                {components.map((name) => {
                  const item =
                    ComponentRegistry[name as keyof typeof ComponentRegistry];
                  const Component = item.component;
                  return (
                    <ComponentCard
                      key={name}
                      name={name}
                      component={Component}
                      meta={item.meta}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComponentCard({ name, component: Component, meta }: any) {
  const defaultProps = getDefaultProps(name);

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
      style={{ opacity: isDragging ? 0 : 1 }}
      {...listeners}
      {...attributes}
    >
      {/* 미니 프리뷰 - 실제로 렌더링 */}
      {/* Layout의 경우에는 실제 렌더링 시 그냥 빈 화면만 나오기 때문에 차후에 보정 필요 */}
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

function getDefaultProps(name: ComponentName): Record<string, any> {
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
  }, {} as Record<string, any>);
}
