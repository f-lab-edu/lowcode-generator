import type { Meta, StoryObj } from "@storybook/react";
import {
  COLOR_VARIANTS,
  SIZE_VARIANTS,
} from "@packages/vanilla-extract-config";
import { Stack } from "../layout/stack";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    color: {
      control: "select",
      options: COLOR_VARIANTS,
      description: "버튼 색상",
    },
    size: {
      control: "radio",
      options: SIZE_VARIANTS,
      description: "버튼 크기",
    },
  },
  decorators: (stories) => (
    <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
      {stories()}
    </div>
  ),
  args: {
    color: "brand",
    size: "md",
    fullWidth: false,
    children: "Button",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: "brand",
    size: "md",
    fullWidth: false,
    children: "Button",
  },
};

export const ColorButtons: Story = {
  render: (args) => (
    <>
      {COLOR_VARIANTS.map((color) => (
        <Button key={color} color={color} size={args.size}>
          {color}
        </Button>
      ))}
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button의 `color` props를 변경하면 type에 맞는 색상의 버튼을 생성할 수 있습니다.",
      },
    },
  },
  args: {
    color: "brand",
    size: "md",
    fullWidth: false,
    children: "Button",
  },
};

export const SizeButtons: Story = {
  render: (args) => (
    <Stack direction="column" gap="sm">
      <Button color={args.color} size={"sm"}>
        SM 버튼
      </Button>
      <Button color={args.color} size={"md"}>
        MD 버튼
      </Button>
      <Button color={args.color} size={"lg"}>
        LG 버튼
      </Button>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button의 `size` props를 변경하면 size에 맞는 색상의 버튼을 생성할 수 있습니다.",
      },
    },
  },
  args: {
    color: "info",
    size: "md",
    fullWidth: false,
    children: "Button",
  },
};

export const FullWidthButtons: Story = {
  render: (args) => (
    <Button color={args.color} size={args.size} fullWidth={true}>
      Full Width 버튼
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button의 `fullWidth` props를 true로 설정하면 현재 속해있는 container의 100% width를 차지하는 버튼을 생성합니다",
      },
    },
  },
  args: {
    color: "brand",
    size: "md",
    fullWidth: false,
    children: "Button",
  },
};
