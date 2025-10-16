import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { getComponentMeta, getComponent, type Component } from "@packages/ui";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type TreeNode } from "../../types";
import { DroppableArea } from "./droppable-area";

const TreeNodeComponent = ({ node }: { node: TreeNode }) => {
  const meta = getComponentMeta(node.componentName);
  const Component = getComponent(node.componentName) as Component;
  const canHaveChildren = meta?.hasChildren;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: node.id,
    data: {
      type: "tree-node",
      componentName: node.componentName,
      props: node.props,
      meta: meta,
      node,
      canHaveChildren,
    },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    display: "inline-block",
    margin: "4px",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="tree-node"
      {...attributes}
      {...listeners}
    >
      {canHaveChildren ? (
        <DroppableArea nodeId={node.id}>
          <Component {...node.props}>
            {node.children.length > 0 ? (
              <TreeRenderer nodes={node.children} />
            ) : node.props.children ? (
              node.props.children
            ) : (
              <div className="empty-drop-zone">Drop here to nest</div>
            )}
          </Component>
        </DroppableArea>
      ) : (
        <Component {...node.props} />
      )}
    </div>
  );
};

TreeNodeComponent.displayName = "TreeNodeComponent";

const TreeRenderer = ({ nodes }: { nodes: TreeNode[] }) => {
  return (
    <SortableContext
      items={nodes.map((n) => n.id)}
      strategy={rectSortingStrategy}
    >
      {nodes.map((node) => (
        <TreeNodeComponent key={node.id} node={node} />
      ))}
    </SortableContext>
  );
};

TreeRenderer.displayName = "TreeRenderer";

export { TreeNodeComponent, TreeRenderer };
