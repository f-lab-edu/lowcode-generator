import { useState } from "react";
import type { TreeNode } from "../types";
import { type DragEndEvent } from "@dnd-kit/core";
import { parseScaffoldToTree } from "../utils/parseScaffoldToTree";
import { getComponentMeta } from "@packages/ui";
import { useTreeStore } from "../store/treeStore";

export function useDragAndDrop() {
  const [activeDrag, setActiveDrag] = useState<any>(null);
  const {
    tree,
    setTree,
    insertIntoContainer,
    findAndRemoveNode,
    findAndInsertNode,
  } = useTreeStore();

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveDrag(active.data.current);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDrag(null);
    if (!over || active.id === over.id) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    // ✅ Zustand 상태 직접 접근
    const currentTree = useTreeStore.getState().tree;

    let updatedTree = currentTree;

    if (activeType === "palette-item") {
      const data = active.data.current;
      if (!data) return;

      const meta = getComponentMeta(data.componentName);
      const parsedChildren = meta?.scaffold
        ? parseScaffoldToTree(meta.scaffold)
        : [];

      const newNode: TreeNode = {
        id: `node-${Date.now()}-${Math.random()}`,
        componentName: data.componentName,
        props: data.props,
        children: parsedChildren,
      };

      const targetNodeId =
        overType === "drop-area"
          ? over.data.current?.nodeId || over.id
          : over.id;

      insertIntoContainer(targetNodeId, newNode);
      updatedTree = useTreeStore.getState().tree;
    }

    if (activeType === "tree-node") {
      const [treeAfterRemove, removedNode] = findAndRemoveNode(
        active.id as string
      );

      if (!removedNode) return;

      if (overType === "canvas-root" || overType === "drop-area") {
        const targetNodeId =
          overType === "drop-area"
            ? over.data.current?.nodeId || over.id
            : over.id;
        insertIntoContainer(targetNodeId, removedNode);
      } else {
        findAndInsertNode(removedNode, over.id as string);
      }

      updatedTree = useTreeStore.getState().tree;
    }

    // ✅ 최종적으로 트리 교체
    setTree(updatedTree);
  };

  return {
    activeDrag,
    tree,
    handleDragStart,
    handleDragEnd,
  };
}
