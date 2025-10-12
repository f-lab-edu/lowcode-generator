import { type ComponentMetaDefinition } from "../../types/meta";
import {
  COLOR_VARIANTS,
  SIZE_VARIANTS,
} from "@packages/vanilla-extract-config";

export const ButtonMeta: ComponentMetaDefinition = {
  component: "Button",
  category: "UI",
  description: "버튼",
  renderPreview: (Component, props) => (
    <Component {...props}>Click me</Component>
  ),
  props: {
    color: {
      control: "select",
      options: [...COLOR_VARIANTS],
      default: "primary",
      description: "버튼 색상",
    },
    size: {
      control: "select",
      options: [...SIZE_VARIANTS],
      default: "md",
      description: "버튼 크기",
    },
    fullWidth: {
      control: "boolean",
      default: false,
      description: "전체 넓이 여부",
    },
  },
};
