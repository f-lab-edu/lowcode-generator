export type ControlType = "text" | "number" | "boolean" | "select" | "color";

/*
 * 속성 편집 시 활용할 Component Props Meta 타입
 */
export type PropsMeta = {
  control: ControlType;
  options?: string[] | number[];
  default?: string | number | boolean;
  required?: boolean;
  description?: string;
};

export type ComponentMetaDefinition = {
  component: string;
  category: string;
  description: string;
  renderPreview?: (Component: any, defaultProps: any) => React.ReactNode;
  props: Record<string, PropsMeta>;
};
