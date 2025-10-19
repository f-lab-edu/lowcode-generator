import { DragOverlay } from "@dnd-kit/core";
import { type TreeNode } from "../../types";
import {
  ComponentRegistry,
  type ComponentName,
  type ComponentRegistryItem,
} from "@packages/ui";
const DragComponentOverlay = ({ activeDrag }: { activeDrag: TreeNode }) => {
  return (
    <DragOverlay>
      {activeDrag
        ? (() => {
            const item = ComponentRegistry[
              activeDrag.componentName as ComponentName
            ] as ComponentRegistryItem;
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
          })()
        : null}
    </DragOverlay>
  );
};

DragComponentOverlay.displayName = "DragComponentOverlay";

export { DragComponentOverlay };
