import { CanvasView } from "../canvas/canvas-view";
import { TreeView } from "../tree/tree-view";

interface TabContentProps {
  activeTab: string | undefined;
  isPending: boolean;
}

export function TabContent({ activeTab, isPending }: TabContentProps) {
  if (isPending) {
    return (
      <div className="tab-fallback">
        <span className="spinner" /> Loading {activeTab}...
      </div>
    );
  }
  switch (activeTab) {
    case "Canvas":
      return <CanvasView />;
    case "Tree":
      return <TreeView />;
    case "Code":
      return <div>Code View</div>;
    default:
      return null;
  }
}
