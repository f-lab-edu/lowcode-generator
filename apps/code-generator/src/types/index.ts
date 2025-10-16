import type { ComponentName } from "@packages/ui";

export type TreeNode = {
  id: string;
  componentName: ComponentName;
  props: Record<string, any>;
  children: TreeNode[];
};
