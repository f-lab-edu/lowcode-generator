import { getComponentMeta } from "@packages/ui";
import { type TreeNode } from "../types";

export function useTreeNode() {
  /**
   * 노드를 특정 컨테이너 내부로 삽입합니다.
   * @param tree
   * @param targetId
   * @param newNode
   * @returns 트리 노드 배열
   */
  function insertIntoContainer(
    tree: TreeNode[],
    targetId: string,
    newNode: TreeNode
  ): TreeNode[] {
    if (targetId === "canvas-root") {
      return [...tree, newNode];
    }

    return tree.map((node) => {
      if (node.id === targetId) {
        const meta = getComponentMeta(node.componentName);
        if (meta?.hasChildren) {
          return { ...node, children: [...(node.children || []), newNode] };
        }
      }
      if (node.children) {
        return {
          ...node,
          children: insertIntoContainer(node.children, targetId, newNode),
        };
      }
      return node;
    });
  }

  /**
   * 재귀적으로 노드를 탐색하여 트리에서 특정 노드를 제거합니다.
   * @returns [수정된 트리, 제거된 노드]
   */
  function findAndRemoveNode(
    nodes: TreeNode[],
    id: string
  ): [TreeNode[], TreeNode | null] {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (!node) continue;
      if (node.id === id) {
        const newNodes = [...nodes];
        newNodes.splice(i, 1);
        return [newNodes, node];
      }
      if (node.children) {
        const [newChildren, removed] = findAndRemoveNode(node.children, id);
        if (removed) {
          const newNodes = [...nodes];
          newNodes[i] = { ...node, children: newChildren };
          return [newNodes, removed];
        }
      }
    }
    return [nodes, null];
  }

  /**
   * 재귀적으로 노드를 탐색하여 다른 노드 옆(위/아래)에 새 노드를 삽입합니다.
   * (순서를 바꾸는 경우)
   */
  function findAndInsertNode(
    nodes: TreeNode[],
    nodeToInsert: TreeNode,
    targetId: string
  ): TreeNode[] | null {
    const targetIndex = nodes.findIndex((n) => n.id === targetId);
    if (targetIndex !== -1) {
      const newNodes = [...nodes];
      newNodes.splice(targetIndex, 0, nodeToInsert);
      return newNodes;
    }

    for (const node of nodes) {
      if (node.children) {
        const newChildren = findAndInsertNode(
          node.children,
          nodeToInsert,
          targetId
        );
        if (newChildren) {
          return nodes.map((n) =>
            n.id === node.id ? { ...n, children: newChildren } : n
          );
        }
      }
    }
    return null;
  }

  return {
    insertIntoContainer,
    findAndRemoveNode,
    findAndInsertNode,
  };
}
