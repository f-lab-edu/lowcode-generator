import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import {
  getComponentMeta,
  getComponent,
  type ComponentType,
} from "@packages/ui";
import { type TreeNode } from "../../types";
import { TableNodeTree } from "./tree-node-table";
import { DroppableArea } from "./droppable-area";
import { useSortableDragAndHover } from "../../hooks/useSortableDragAndHover";

interface TreeNodeComponentProps {
  node: TreeNode;
}

const TreeNodeComponent = ({ node }: TreeNodeComponentProps) => {
  const meta = getComponentMeta(node.componentName);
  const Component = getComponent(node.componentName) as ComponentType;
  const canHaveChildren = meta?.hasChildren;

  const { isHovered, setIsHovered, dragProps, handleMouseDown } =
    useSortableDragAndHover(node);

  // Table 컴포넌트는 전용 에디터 사용
  if (node.componentName === "Table") {
    return <TableNodeTree rootNode={node} />;
  }

  if (node.componentName === "Text") {
    return node.props.children;
  }

  // children 렌더링
  const renderChildren = () => {
    if (node.children.length > 0) {
      return (
        <SortableContext
          items={node.children.map((child) => child.id)}
          strategy={rectSortingStrategy}
        >
          <TreeRenderer nodes={node.children} />
        </SortableContext>
      );
    }
    if (node.props.children) {
      return node.props.children;
    }
    return <EmptyDropZone />;
  };

  // 일반 컴포넌트 중 children을 가질 수 있는 경우
  if (canHaveChildren) {
    return (
      <DroppableArea
        nodeId={node.id}
        dragRef={dragProps.ref}
        dragAttributes={dragProps.attributes}
        dragListeners={dragProps.listeners}
        dragStyle={dragProps.style}
      >
        <Component
          {...node.props}
          data-node-id={node.id}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDownCapture={handleMouseDown}
        >
          {renderChildren()}
        </Component>
      </DroppableArea>
    );
  }

  // 일반 요소 (children 없음) - inline 요소들
  return (
    <Component
      {...node.props}
      ref={dragProps.ref}
      style={{ ...dragProps.style, ...node.props.style }}
      data-node-id={node.id}
      {...dragProps.attributes}
      {...dragProps.listeners}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDownCapture={handleMouseDown}
    />
  );
};

// 테이블 구조에 맞는 빈 영역 컴포넌트
const EmptyDropZone = () => {
  return <div className="empty-drop-zone">Drop here to nest</div>;
};

TreeNodeComponent.displayName = "TreeNodeComponent";

interface TreeRendererProps {
  nodes: TreeNode[];
}

const TreeRenderer = ({ nodes }: TreeRendererProps) => {
  if (nodes.length === 0) return null;

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
