import { type ComponentMetaDefinition } from "../../types/meta";
import { CONTAINER_WIDTH_SCALE } from "@packages/vanilla-extract-config";

export const ContainerMeta: ComponentMetaDefinition = {
  component: "Container",
  category: "Layout",
  description: "컨테이너",
  props: {
    widthScale: {
      control: "select",
      options: [...CONTAINER_WIDTH_SCALE],
      default: "md",
      description: "Container 넓이 스케일",
    },
    minHeight: {
      control: "text",
      default: 300,
      description: "Container의 최소 높이",
    },
  },
};
