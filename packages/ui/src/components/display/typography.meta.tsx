import { type ComponentMetaDefinition } from "../../types/meta";
import { TYPOGRAPHY_ROLES } from "@packages/vanilla-extract-config";
import { TYPOGRAPHY_ELEMENT } from "./typography";

export const TypographyMeta: ComponentMetaDefinition = {
  component: "Typography",
  category: "Display",
  description: "타이포그래피",
  renderPreview: (Component, props) => (
    <Component {...props}>Typography</Component>
  ),
  props: {
    as: {
      control: "select",
      options: [...TYPOGRAPHY_ELEMENT],
      default: "h1",
      description: "타이포그래피 마크업 태그 요소",
    },
    role: {
      control: "select",
      options: [...TYPOGRAPHY_ROLES],
      default: "headingXxl",
      description: "타이포그래피 역할과 scale",
    },
  },
};
