import { useTreeStore } from "../../store/treeStore";
import { CodeViewer } from "./code-viewer";
import "./code-editor-view.css";

export function CodeEditorView() {
  const { tree } = useTreeStore();

  return (
    <div className="code-editor-view">
      <h2 className="code-editor-header">Generated Code</h2>
      <div className="code-editor-container">
        <CodeViewer nodes={tree} height="100%" showMinimap={true} />
      </div>
    </div>
  );
}
