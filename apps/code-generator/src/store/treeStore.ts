import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getComponentMeta } from "@packages/ui";
import { type TreeNode } from "../types";

interface TreeStore {
  tree: TreeNode[];
  hoveredNodeId: string | null;
  setHoveredNode: (id: string | null) => void;
  selectedNode: TreeNode | null;
  setSelectedNode: (node: TreeNode) => void;
  setTree: (tree: TreeNode[]) => void;
  insertIntoContainer: (targetId: string, newNode: TreeNode) => void;
  findAndRemoveNode: (id: string) => [TreeNode[], TreeNode | null];
  findAndInsertNode: (nodeToInsert: TreeNode, targetId: string) => void; // after
  findAndInsertBefore: (nodeToInsert: TreeNode, targetId: string) => void; // before
  updateNodeById: (nodeId: string, updateNode: TreeNode) => void;
  updateNodeProps: (nodeId: string, props: Record<string, unknown>) => void;
  reset: () => void;
}

export const useTreeStore = create<TreeStore>()(
  devtools((set, get) => ({
    tree: [],
    hoveredNodeId: null,
    selectedNode: null,
    setHoveredNode: (id) => {
      if (!id) return;
      set({ hoveredNodeId: id });
    },
    setSelectedNode: (node) => {
      if (!node.id) return;
      set({ selectedNode: node });
    },
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
     * 재귀적으로 노드를 탐색하여 노드에 새 노드를 삽입
     * direction이 after인 경우는 노드 뒤에 삽입
     */
    findAndInsertNode: (nodeToInsert: TreeNode, targetId: string) => {
      const { tree } = get();

      function insert(nodes: TreeNode[]): TreeNode[] | null {
        const targetIndex = nodes.findIndex((n) => n.id === targetId);
        if (targetIndex !== -1) {
          const newNodes = [...nodes];
          newNodes.splice(targetIndex + 1, 0, nodeToInsert); // after
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
    /**
     * 재귀적으로 노드를 탐색하여 노드에 새 노드를 삽입
     * direction이 before인 경우는 노드 앞에 삽입
     */
    findAndInsertBefore: (nodeToInsert: TreeNode, targetId: string) => {
      const { tree } = get();

      function insert(nodes: TreeNode[]): TreeNode[] | null {
        const targetIndex = nodes.findIndex((n) => n.id === targetId);
        if (targetIndex !== -1) {
          const newNodes = [...nodes];
          newNodes.splice(targetIndex, 0, nodeToInsert); // before
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
    /**
     * 노드 아이디 기준으로 찾은 특정 노드를 수정
     * @param nodeId 수정할 노드 아이디
     * @param updatedNode 수정될 노드 정보
     */
    updateNodeById: (nodeId, updatedNode) => {
      const { tree } = get();

      function update(nodes: TreeNode[]): TreeNode[] {
        return nodes.map((n) => {
          if (n.id === nodeId) return updatedNode;
          if (n.children && n.children.length > 0) {
            return { ...n, children: update(n.children) };
          }
          return n;
        });
      }

      const updatedTree = update(tree);
      set({ tree: updatedTree });
    },
    /**
     * 특정 노드의 props만 업데이트
     * @param nodeId 업데이트할 노드 아이디
     * @param props 업데이트할 props 객체
     */
    updateNodeProps: (nodeId, props) => {
      const { tree, selectedNode } = get();

      function update(nodes: TreeNode[]): TreeNode[] {
        return nodes.map((node) => {
          if (node.id === nodeId) {
            const updatedNode = {
              ...node,
              props: {
                ...node.props,
                ...props,
              },
            };
            // 선택된 노드도 함께 업데이트
            if (selectedNode?.id === nodeId) {
              set({ selectedNode: updatedNode });
            }
            return updatedNode;
          }
          if (node.children && node.children.length > 0) {
            return { ...node, children: update(node.children) };
          }
          return node;
        });
      }

      const updatedTree = update(tree);
      set({ tree: updatedTree });
    },
    reset: () => set({ tree: [] }),
  }))
);
