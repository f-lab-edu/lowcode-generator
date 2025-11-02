import type { ComponentMeta, ComponentName } from "@packages/ui";

export interface TreeNode {
  id: string;
  componentName: ComponentName;
  props: Record<string, unknown>;
  meta?: ComponentMeta;
  children: TreeNode[];
}
