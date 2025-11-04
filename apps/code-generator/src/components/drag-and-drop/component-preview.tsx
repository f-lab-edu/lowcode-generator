import {
  type ComponentType,
  type ComponentName,
  type ComponentMeta,
} from "@packages/ui";
import { getDefaultProps } from "../../utils/getDefaultProps";

export interface ComponentPreviewProps {
  componentName: ComponentName;
  component: ComponentType;
  meta: ComponentMeta;
  props?: Record<string, unknown>;
}
export function ComponentPreview({
  componentName,
  component,
  meta,
  props,
}: ComponentPreviewProps) {
  const Component = component;
  const defaultProps = getDefaultProps(componentName);
  return (
    <div className="thumbnail">
      <div className="mini-preview">
        {meta.renderPreview ? (
          meta.renderPreview(Component, { ...defaultProps, ...(props || {}) })
        ) : meta.hasChildren ? (
          <Component {...defaultProps} {...(props || {})}>
            Preview
          </Component>
        ) : (
          <Component {...defaultProps} {...(props || {})} />
        )}
      </div>
    </div>
  );
}
