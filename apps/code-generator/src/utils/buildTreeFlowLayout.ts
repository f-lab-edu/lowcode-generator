import type { TreeNode } from "../types";
import type { Node, Edge } from "@xyflow/react";

/**
 * 서브 트리의 폭 계산
 * @param node 노드
 * @returns 계산된 서브 트리 폭을 포함한 노드의 하위 자식 배열
 */
export function getSubtreeWidth(node: TreeNode): number {
  if (!node.children.length) return 1;
  return node.children
    .map((child) => getSubtreeWidth(child))
    .reduce((sum, w) => sum + w, 0);
}

/**
 * (React flow 배치를 위한) 트리 flow 레이아웃 생성
 * @param tree flow 생성을 위한 트리
 * @returns 트리 레이아웃
 */
export function buildTreeFlowLayout(tree: TreeNode[]) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const horizontalSpacing = 220;
  const verticalSpacing = 120;

  function traverse(node: TreeNode, depth = 0, offsetX = 0) {
    const subtreeWidth = getSubtreeWidth(node);

    // 부모 기준으로 시작 X 좌표 계산
    let currentX = offsetX;

    node.children.forEach((child) => {
      const childWidth = getSubtreeWidth(child);

      edges.push({
        id: `${node.id}-${child.id}`,
        source: node.id,
        target: child.id,
        type: "component-edge",
      });

      traverse(child, depth + 1, currentX);
      currentX += childWidth;
    });

    // 부모의 X 좌표는 자식들의 중심에 위치 (겹치지 않은 배치 및 edge 위치를 위한 계산)
    const centerX = offsetX + subtreeWidth / 2 - 0.5;

    nodes.push({
      id: node.id,
      position: {
        x: centerX * horizontalSpacing,
        y: depth * verticalSpacing,
      },
      data: {
        label: node.componentName,
        meta: { ...node.meta },
        props: { ...node.props },
      },
    });
  }

  // 여러 루트 노드가 있을 경우 처리
  let rootOffset = 0;
  for (const root of tree) {
    traverse(root, 0, rootOffset);
    rootOffset += getSubtreeWidth(root);
  }

  return { nodes, edges };
}
