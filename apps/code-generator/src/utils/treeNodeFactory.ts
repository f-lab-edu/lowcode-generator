import type { TreeNode } from "../types";
import { nanoid } from "nanoid";
import { getComponentMeta, type ComponentName } from "@packages/ui";
import { parseScaffoldToTree } from "./parseScaffoldToTree";

/**
 * 신규 노드를 생성합니다.
 * @param componentName 컴포넌트명
 * @param props 컴포넌트 props
 * @returns 새로 생성된 신규 노드
 */
export function createNode(
  componentName: ComponentName,
  props: Record<string, unknown> = {}
): TreeNode {
  const meta = getComponentMeta(componentName);

  if (meta?.scaffold) {
    const parsedNode: TreeNode | null = parseScaffoldToTree(meta.scaffold);

    if (parsedNode) {
      return {
        ...parsedNode,
        props: { ...parsedNode?.props, ...props },
      };
    }
  }

  return {
    id: nanoid(),
    componentName,
    props,
    meta,
    children: [],
  };
}
