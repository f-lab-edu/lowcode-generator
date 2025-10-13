export type ControlType =
  | "text"
  | "number"
  | "boolean"
  | "select"
  | "radio"
  | "color"
  | "json";

/*
 * 속성 편집 시 활용할 Component Props Meta 타입
 */
export type PropsMeta = {
  control: ControlType;
  options?: string[] | number[];
  default?: string | number | boolean | object;
  required?: boolean;
  description?: string;
};

export type ComponentMetaDefinition = {
  component: string;
  category: string;
  description: string;
  props: Record<string, PropsMeta>;
  scaffold?: string;
  renderPreview?: (Component: React.ElementType, props: any) => React.ReactNode;
};
