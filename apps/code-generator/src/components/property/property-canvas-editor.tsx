import {
  getComponent,
  getComponentMeta,
  type ComponentName,
} from "@packages/ui";
import { Plus, X } from "lucide-react";
import { getDefaultProps } from "../../utils/getDefaultProps";
import { useAddNewComponent } from "../../hooks/useAddNewComponent";
import { ComponentPreview } from "../drag-and-drop/component-preview";
import { PropertyField } from "./property-field";
import "./property-canvas-editor.css";

interface PropertyCanvasEditorProps {
  componentName: ComponentName;
  onClose: () => void;
}

export function PropertyCanvasEditor({
  componentName,
  onClose,
}: PropertyCanvasEditorProps) {
  const meta = getComponentMeta(componentName);
  const component = getComponent(componentName);
  const defaultProps: Record<string, unknown> = getDefaultProps(componentName);

  const { componentProps, handleComponentPropsChange, addNewComponent } =
    useAddNewComponent(defaultProps);

  if (!meta) return null;

  const handleAddComponent = () => {
    addNewComponent(componentName, componentProps);
    onClose();
  };

  return (
    <div className="property-canvas-editor-overlay" onClick={onClose}>
      <div
        className="property-canvas-editor-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="property-canvas-editor-header">
          <div className="header-content">
            <h3>{meta.component}</h3>
            <button
              className="close-button"
              onClick={onClose}
              aria-label="Close"
            >
              <X />
            </button>
          </div>
          {meta.description && (
            <p className="component-description">{meta.description}</p>
          )}
        </div>
        <ComponentPreview
          componentName={componentName}
          meta={meta}
          component={component}
          props={componentProps}
        />
        <div className="property-fields-scroll">
          {Object.keys(meta.props).length === 0 ? (
            <p className="no-properties">No properties available</p>
          ) : (
            Object.entries(meta.props).map(([propName, propMeta]) => (
              <PropertyField
                key={propName}
                propName={propName}
                propMeta={propMeta}
                value={componentProps[propName]}
                onChange={(value) =>
                  handleComponentPropsChange(propName, value)
                }
              />
            ))
          )}
        </div>
        <div className="property-canvas-editor-footer">
          <button className="add-component-button" onClick={handleAddComponent}>
            <Plus /> <span>Add Component</span>
          </button>
        </div>
      </div>
    </div>
  );
}
