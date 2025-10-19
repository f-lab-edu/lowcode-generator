import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import {
  getComponentMeta,
  getComponent,
  type ComponentType,
} from "@packages/ui";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type TreeNode } from "../../types";
import { DroppableArea } from "./droppable-area";

const TABLE_TAGS = ["Table", "Thead", "Tbody", "Tfoot", "Tr", "Th", "Td"];

const TreeNodeComponent = ({ node }: { node: TreeNode }) => {
  const meta = getComponentMeta(node.componentName);
  const Component = getComponent(node.componentName) as ComponentType;
  const canHaveChildren = meta?.hasChildren;
  const isTableTag = TABLE_TAGS.includes(node.componentName);

  if (node.componentName === "Text") {
    return node.props.children;
  }

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
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

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // children 렌더링
  const renderChildren = () => {
    if (node.children.length > 0) {
      return <TreeRenderer nodes={node.children} />;
    }
    if (node.props.children) {
      return node.props.children;
    }
    return <EmptyDropZone componentName={node.componentName} />;
  };

  if (canHaveChildren) {
    return (
      <div
        ref={setSortableRef}
        style={dragStyle}
        className="tree-node-wrapper"
        {...attributes}
        {...listeners}
      >
        <DroppableArea nodeId={node.id}>
          <Component {...node.props}>{renderChildren()}</Component>
        </DroppableArea>
      </div>
    );
  }

  // hasChildren이 아닌 경우 (Th, Td 등)
  if (isTableTag) {
    // 테이블 셀은 wrapper 없이 직접 렌더링 (div 추가 시 html 오류 발생 방지)
    return (
      <Component
        {...node.props}
        ref={setSortableRef}
        style={dragStyle}
        {...attributes}
        {...listeners}
      />
    );
  }

  // 일반 요소는 div로 감싸기 (inline-block 처리)
  return (
    <div
      ref={setSortableRef}
      style={{ ...dragStyle, display: "inline-block" }}
      className="tree-node"
      {...attributes}
      {...listeners}
    >
      <Component {...node.props} />
    </div>
  );
};

// 테이블 구조에 맞는 빈 영역 컴포넌트
const EmptyDropZone = ({ componentName }: { componentName: string }) => {
  const messages: Record<string, string> = {
    Table: "Drop Thead, Tbody, or Tfoot here",
    Thead: "Drop Tr here",
    Tbody: "Drop Tr here",
    Tfoot: "Drop Tr here",
    Tr: "Drop Th or Td here",
  };

  const message = messages[componentName] || "Drop here to nest";

  // 테이블 행 내부인 경우 td로 렌더링
  if (componentName === "Tr") {
    return (
      <td colSpan={999} className="empty-drop-zone">
        {message}
      </td>
    );
  }

  // 테이블 섹션 내부인 경우 tr > td로 렌더링
  if (["Thead", "Tbody", "Tfoot"].includes(componentName)) {
    return (
      <tr>
        <td colSpan={999} className="empty-drop-zone">
          {message}
        </td>
      </tr>
    );
  }

  // 일반 요소는 div 사용
  return <div className="empty-drop-zone">{message}</div>;
};

TreeNodeComponent.displayName = "TreeNodeComponent";

const TreeRenderer = ({ nodes }: { nodes: TreeNode[] }) => {
  // SortableContext는 형제 간 정렬에만 사용
  // 부모-자식 드롭은 DroppableArea가 처리
  if (nodes.length === 0) return null;

  return (
    <SortableContext
      items={nodes.map((n) => n.id)}
      strategy={rectSortingStrategy}
    >
      {nodes.map((node) => (
        <SortableContext items={node.children.map((child) => child.id)}>
          <TreeNodeComponent key={node.id} node={node} />
        </SortableContext>
      ))}
    </SortableContext>
  );
};

TreeRenderer.displayName = "TreeRenderer";

export { TreeNodeComponent, TreeRenderer };
