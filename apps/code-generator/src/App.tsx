import { DragAndDropContext } from "./components/drag-and-drop/drag-and-drop-context";
import { ComponentPalette } from "./components/component-palette/component-palette";
import { ComponentCanvas } from "./components/canvas/component-canvas";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <DragAndDropContext>
        <ComponentPalette />
        <main className="main">
          <section className="main-section">
            <ComponentCanvas />
          </section>
        </main>
      </DragAndDropContext>
    </div>
  );
}

export default App;
