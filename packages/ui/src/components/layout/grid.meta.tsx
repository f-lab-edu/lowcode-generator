import { type ComponentMetaDefinition } from "../../types/meta";
import { GRID_GAP, GRID_PADDING } from "@packages/vanilla-extract-config";

export const GridMeta: ComponentMetaDefinition = {
  component: "Grid",
  category: "Layout",
  description: "그리드",
  props: {
    container: {
      control: "boolean",
      default: false,
      description: "Grid 컨테이너 여부",
    },
    columns: {
      control: "select",
      options: [2, 3, 4, 6, 8, 12],
      default: "column",
      description: "그리드의 총 컬럼 개수 (grid-template-columns)",
    },
    gap: {
      control: "select",
      options: [...GRID_GAP],
      default: "md",
      description: "그리드 셀 간격(Gap)",
    },
    padding: {
      control: "select",
      options: [...GRID_PADDING],
      default: "start",
      description: "컨테이너 내부 여백",
    },
  },
};
