import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type TreeNode } from "../types";
import { getComponentMeta } from "@packages/ui";

interface TreeStore {
  tree: TreeNode[];
  setTree: (tree: TreeNode[]) => void;
  insertIntoContainer: (targetId: string, newNode: TreeNode) => void;
  findAndRemoveNode: (id: string) => [TreeNode[], TreeNode | null];
  findAndInsertNode: (nodeToInsert: TreeNode, targetId: string) => void;
  reset: () => void;
}

export const useTreeStore = create<TreeStore>()(
  devtools((set, get) => ({
    tree: [],
    setTree: (tree) => set({ tree }),
    /**
     * 노드를 특정 컨테이너 내부로 삽입
     * @param targetId
     * @param newNode
     * @returns 트리 노드 배열
     */
    insertIntoContainer: (targetId, newNode) => {
      const { tree } = get();

      function insert(nodes: TreeNode[]): TreeNode[] {
        if (targetId === "canvas-root") {
          return [...nodes, newNode];
        }
        return nodes.map((node) => {
          if (node.id === targetId) {
            const meta = getComponentMeta(node.componentName);
            if (meta?.hasChildren) {
              return { ...node, children: [...(node.children || []), newNode] };
            }
          }
          if (node.children) {
            return { ...node, children: insert(node.children) };
          }
          return node;
        });
      }

      const updated = insert(tree);
      set({ tree: updated });
    },
    /**
     * 재귀적으로 노드를 탐색하여 트리에서 특정 노드를 제거
     * @returns [수정된 트리, 제거된 노드]
     */
    findAndRemoveNode: (id: string): [TreeNode[], TreeNode | null] => {
      const { tree } = get();

      function remove(nodes: TreeNode[]): [TreeNode[], TreeNode | null] {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (!node) return [nodes, null];
          if (node.id === id) {
            const newNodes = [...nodes];
            newNodes.splice(i, 1);
            return [newNodes, node];
          }
          if (node.children) {
            const [newChildren, removed] = remove(node.children);
            if (removed) {
              const newNodes = [...nodes];
              newNodes[i] = { ...node, children: newChildren };
              return [newNodes, removed];
            }
          }
        }
        return [nodes, null];
      }

      const [updated, removed] = remove(tree);
      set({ tree: updated });
      return [updated, removed];
    },
    /**
     * 재귀적으로 노드를 탐색하여 다른 노드 옆(위/아래)에 새 노드를 삽입
     * (순서를 바꾸는 경우)
     */
    findAndInsertNode: (nodeToInsert: TreeNode, targetId: string) => {
      const { tree } = get();

      function insert(nodes: TreeNode[]): TreeNode[] | null {
        const targetIndex = nodes.findIndex((n) => n.id === targetId);
        if (targetIndex !== -1) {
          const newNodes = [...nodes];
          newNodes.splice(targetIndex, 0, nodeToInsert);
          return newNodes;
        }

        for (const node of nodes) {
          if (node.children) {
            const newChildren = insert(node.children);
            if (newChildren) {
              return nodes.map((n) =>
                n.id === node.id ? { ...n, children: newChildren } : n
              );
            }
          }
        }
        return null;
      }

      const updated = insert(tree);
      if (updated) set({ tree: updated });
    },
    reset: () => set({ tree: [] }),
  }))
);
