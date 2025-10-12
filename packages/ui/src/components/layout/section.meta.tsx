import { type ComponentMetaDefinition } from "../../types/meta";
import { SECTION_SPACING_SCALE } from "@packages/vanilla-extract-config";

export const SectionMeta: ComponentMetaDefinition = {
  component: "Section",
  category: "Layout",
  description: "섹션",
  props: {
    spacingScale: {
      control: "select",
      options: [...SECTION_SPACING_SCALE],
      default: "md",
      description: "Section Spacing 스케일 (padding, margin)",
    },
  },
};
