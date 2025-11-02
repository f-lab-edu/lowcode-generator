import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "../layout/stack";
import { Typography } from "../display/typography";
import { Divider, type DividerProps } from "./divider";

const orientationOptions = [
  "horizontal",
  "vertical",
] as const satisfies DividerProps["orientation"][];
const variantOptions = [
  "solid",
  "dashed",
] as const satisfies DividerProps["variant"][];
const colorOptions = [
  "default",
  "subtle",
] as const satisfies DividerProps["color"][];

const meta = {
  title: "UI/Divider",
  component: Divider,
  argTypes: {
    orientation: {
      control: "radio",
      options: orientationOptions,
    },
    variant: {
      control: "radio",
      options: variantOptions,
    },
    color: {
      control: "select",
      options: colorOptions,
    },
  },
  args: {
    orientation: "horizontal",
    variant: "solid",
    color: "default",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    orientation: "horizontal",
  },
};

export const Vertical: Story = {
  render: (args) => (
    <Stack style={{ height: "100px" }}>
      <Divider {...args} />
    </Stack>
  ),
  args: {
    orientation: "vertical",
  },
};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="column" gap="md">
      {variantOptions.map((variant) => (
        <Divider
          key={variant}
          variant={variant}
          color={args.color}
          orientation={args.orientation}
        />
      ))}
    </Stack>
  ),
  args: {
    orientation: "horizontal",
  },
};

export const Colors: Story = {
  render: (args) => (
    <Stack direction="column" gap="md">
      {colorOptions.map((color) => (
        <Divider
          key={color}
          color={color}
          variant={args.variant}
          orientation={args.orientation}
        />
      ))}
    </Stack>
  ),
  args: {
    orientation: "horizontal",
  },
};

export const WithContent: Story = {
  render: (args) => (
    <Stack direction="column" gap="lg">
      <Stack direction="column" gap="sm" style={{ width: "100%" }}>
        <Typography role="headingLg" as="h5">
          Horizontal
        </Typography>
        <Stack
          direction="column"
          gap="md"
          style={{
            padding: "16px",
            border: "1px solid #eee",
            borderRadius: "8px",
          }}
        >
          <Typography role="textMdRegular">Content A</Typography>
          <Divider {...args} orientation="horizontal" />
          <Typography role="textMdRegular">Content B</Typography>
        </Stack>
      </Stack>

      <Stack direction="column" gap="sm" style={{ width: "100%" }}>
        <Typography role="headingLg" as="h5">
          Vertical
        </Typography>
        <Stack
          direction="row"
          gap="md"
          align="center"
          style={{
            padding: "16px",
            border: "1px solid #eee",
            borderRadius: "8px",
            height: "60px",
          }}
        >
          <Typography role="textMdRegular">Content A</Typography>
          <Divider {...args} orientation="vertical" />
          <Typography role="textMdRegular">Content B</Typography>
        </Stack>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Divider는 예제와 같이 요소들을 가로 또는 세로로 구분할 수 있는 구분선으로 활용될 수 있습니다.",
      },
    },
  },
};
