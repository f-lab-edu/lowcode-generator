import {
  ComponentRegistry,
  ComponentsByCategory,
  type ComponentName,
  type ComponentRegistryItem,
} from "@packages/ui";
import { useState } from "react";
import { DraggableComponentCard } from "../drag-and-drop/draggable-component-card";
import { PropertyCanvasEditor } from "../property/property-canvas-editor";
import "./component-palette.css";

export function ComponentPalette() {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  const [selectedComponent, setSelectedComponent] =
    useState<ComponentName | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleComponentClick = (name: ComponentName) => {
    setSelectedComponent(name);
  };

  const handleCloseDetail = () => {
    setSelectedComponent(null);
  };

  return (
    <section className="sidebar">
      <div className="sidebar-header">
        <h2>Component Palette</h2>
      </div>
      <div className="palette">
        <div className="palette-content">
          {Object.entries(ComponentsByCategory).map(
            ([category, components]) => (
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
                    {(components as ComponentName[])
                      .filter(
                        (name) =>
                          !(ComponentRegistry[name] as ComponentRegistryItem)
                            ?.hidden
                      )
                      .map((name) => {
                        const item = ComponentRegistry[name];
                        const Component = item.component;
                        return (
                          <DraggableComponentCard
                            key={name}
                            componentName={name}
                            component={Component}
                            onClick={() => handleComponentClick(name)}
                            isSelected={selectedComponent === name}
                            meta={item.meta}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      {selectedComponent && (
        <PropertyCanvasEditor
          componentName={selectedComponent}
          onClose={handleCloseDetail}
        />
      )}
    </section>
  );
}
