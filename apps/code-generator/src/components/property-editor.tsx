import { getComponentMeta, type ComponentName } from "@packages/ui";

interface PropertyEditorProps {
  componentName: ComponentName;
  currentProps: Record<string, any>;
  onChange: (props: Record<string, any>) => void;
}

export function PropertyEditor({
  componentName,
  currentProps,
  onChange,
}: PropertyEditorProps) {
  const meta = getComponentMeta(componentName);

  if (!meta) return null;

  return (
    <div className="property-editor">
      <h3>{meta.component} Properties</h3>

      {Object.entries(meta.props).map(([propName, propMeta]) => (
        <div key={propName} className="property-field">
          <label>{propName}</label>

          {propMeta.control === "select" && (
            <select
              value={currentProps[propName] ?? propMeta.default}
              onChange={(e) => {
                onChange({
                  ...currentProps,
                  [propName]: e.target.value,
                });
              }}
            >
              {propMeta.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {propMeta.control === "text" && (
            <input
              type="text"
              value={currentProps[propName] ?? propMeta.default ?? ""}
              onChange={(e) => {
                onChange({
                  ...currentProps,
                  [propName]: e.target.value,
                });
              }}
            />
          )}

          {propMeta.control === "number" && (
            <input
              type="number"
              value={currentProps[propName] ?? propMeta.default ?? 0}
              onChange={(e) => {
                onChange({
                  ...currentProps,
                  [propName]: Number(e.target.value),
                });
              }}
            />
          )}

          {propMeta.control === "boolean" && (
            <input
              type="checkbox"
              checked={currentProps[propName] ?? propMeta.default ?? false}
              onChange={(e) => {
                onChange({
                  ...currentProps,
                  [propName]: e.target.checked,
                });
              }}
            />
          )}

          {propMeta.description && <small>{propMeta.description}</small>}
        </div>
      ))}
    </div>
  );
}
