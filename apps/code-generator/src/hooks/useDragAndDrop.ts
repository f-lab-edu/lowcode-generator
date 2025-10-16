import { useState } from "react";
import { useTreeNode } from "./useTreeNode";
import type { TreeNode } from "../types";
import { type DragEndEvent } from "@dnd-kit/core";

export function useDragAndDrop(initialTree: TreeNode[]) {
  const [activeDrag, setActiveDrag] = useState<any>(null);
  const [tree, setTree] = useState<TreeNode[]>(initialTree);

  const { insertIntoContainer, findAndRemoveNode, findAndInsertNode } =
    useTreeNode();

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveDrag(active.data.current);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDrag(null);

    if (!over || active.id === over.id) return;

    const activeType = active.data.current?.type;

    setTree((currentTree) => {
      if (activeType === "palette-item") {
        const data = active.data.current;
        if (!data) return currentTree;
        const newNode: TreeNode = {
          id: `node-${Date.now()}-${Math.random()}`,
          componentName: data.componentName,
          props: data.props,
          children: [],
        };
        return insertIntoContainer(currentTree, over.id as string, newNode);
      }

      // 트리 노드 내에서 재정렬
      if (activeType === "tree-node") {
        const [treeAfterRemove, removedNode] = findAndRemoveNode(
          currentTree,
          active.id as string
        );

        if (!removedNode) return currentTree;

        const overType = over.data.current?.type;

        // 다른 컨테이너로 이동
        if (overType === "canvas-root" || overType === "drop-area") {
          return insertIntoContainer(
            treeAfterRemove,
            over.id as string,
            removedNode
          );
        }

        // 다른 아이템 위/아래로 순서 변경
        const finalTree = findAndInsertNode(
          treeAfterRemove,
          removedNode,
          over.id as string
        );
        return finalTree || currentTree;
      }

      return currentTree;
    });
  };

  return {
    activeDrag,
    tree,
    handleDragStart,
    handleDragEnd,
  };
}
