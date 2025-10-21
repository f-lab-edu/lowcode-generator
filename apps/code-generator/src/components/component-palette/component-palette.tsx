import {
  ComponentRegistry,
  ComponentsByCategory,
  type ComponentName,
} from "@packages/ui";
import { useState } from "react";
import { DraggableComponentCard } from "../drag-and-drop/draggable-component-card";
import "./component-palette.css";

export function ComponentPalette() {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }));
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
                    {(components as ComponentName[]).map((name) => {
                      const item = ComponentRegistry[name];
                      const Component = item.component;
                      return (
                        <DraggableComponentCard
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
            )
          )}
        </div>
      </div>
    </section>
  );
}
