import { ComponentPalette } from "./components/component-palette";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Components</h2>
        </div>
        <ComponentPalette />
      </div>
      <div>Canvas 영역</div>
    </div>
  );
}

export default App;
