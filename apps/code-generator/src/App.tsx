import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { ComponentPalette } from "./components/component-palette/component-palette";
import { ComponentCanvas } from "./components/canvas/component-canvas";
import { ComponentRegistry, type ComponentName } from "@packages/ui";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import "./App.css";

function App() {
  const { activeDrag, tree, handleDragStart, handleDragEnd } = useDragAndDrop(
    []
  );

  return (
    <div className="app-layout">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <section className="sidebar">
          <div className="sidebar-header">
            <h2>Components</h2>
          </div>
          <ComponentPalette />
        </section>
        <main className="main">
          <section className="main-section">
            <ComponentCanvas tree={tree} />
          </section>
        </main>
        <DragOverlay>
          {activeDrag ? (
            <div className="component-card" style={{ width: "200px" }}>
              <div className="thumbnail">
                <div className="mini-preview">
                  {(() => {
                    const item =
                      ComponentRegistry[
                        activeDrag.componentName as ComponentName
                      ];
                    if (!item) return null;
                    const { component: Component, meta } = item;
                    const props = activeDrag.props;

                    if (meta.renderPreview) {
                      return meta.renderPreview(Component, props);
                    }
                    if (meta.hasChildren) {
                      return <Component {...props}>Preview</Component>;
                    }
                    return <Component {...props} />;
                  })()}
                </div>
              </div>
              <span className="component-name">
                {activeDrag.meta.component}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default App;
