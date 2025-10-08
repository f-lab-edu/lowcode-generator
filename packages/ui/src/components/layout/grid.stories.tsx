import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./grid";
import { GRID_GAP, GRID_PADDING } from "@packages/vanilla-extract-config";

const meta = {
  title: "Layout/Grid",
  component: Grid,
  argTypes: {
    columns: {
      control: { type: "select" },
      options: [2, 3, 4, 6, 8, 12],
      description: "그리드의 총 컬럼 개수 (grid-template-columns)",
    },
    gap: {
      control: "select",
      options: [...GRID_GAP],
      description: "그리드 셀 간격",
    },
    padding: {
      control: "select",
      options: [...GRID_PADDING],
      description: "컨테이너 내부 여백",
    },
  },
  args: {
    columns: 4,
    gap: "md",
    padding: "md",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

const Item = ({ index }: { index: number }) => (
  <div
    style={{
      background: `hsl(${index * 40}, 70%, 70%)`,
      textAlign: "center",
      borderRadius: 8,
      padding: "8px 0",
      fontWeight: 500,
    }}
  >
    items {index + 1}
  </div>
);

// ✅ 스토리 1: 다양한 columns에 따른 Grid 레이아웃 변경 및 재배치
export const DynamicColumns: Story = {
  render: (args) => (
    <Grid container {...args}>
      {[...Array(12)].map((_, i) => (
        <Grid key={i} size={1}>
          <Item index={i} />
        </Grid>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Grid의 `columns` props를 변경하면 내부 item이 자동으로 새로운 레이아웃으로 재배치됩니다.",
      },
    },
  },
};

// ✅ 스토리 2: 다양한 span 조합
export const MixedSpan: Story = {
  render: (args) => (
    <Grid container {...args}>
      <Grid size={3}>
        <Item index={0} />
      </Grid>
      <Grid size={6}>
        <Item index={1} />
      </Grid>
      <Grid size={3}>
        <Item index={2} />
      </Grid>
      <Grid size={4}>
        <Item index={3} />
      </Grid>
      <Grid size={8}>
        <Item index={4} />
      </Grid>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "각 item의 size(span) 값에 따라 Grid 내에서 차지하는 컬럼 폭이 달라집니다.",
      },
    },
  },
};
