import type { Meta, StoryObj } from "@storybook/react";
import { Button, type ButtonProps } from "./button";

const colorOptions = [
  "brand",
  "info",
  "success",
  "warning",
  "danger",
] as const satisfies ButtonProps["color"][];

const sizeOptions = ["sm", "md", "lg"] as const satisfies ButtonProps["size"][];

const meta = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    color: {
      control: "select",
      options: colorOptions,
    },
    size: {
      control: "radio",
      options: sizeOptions,
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
      {colorOptions.map((color) => (
        <Button color={color} size={args.size}>
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
    <>
      {sizeOptions.map((size) => (
        <Button color={args.color} size={size}>
          {size} 버튼
        </Button>
      ))}
    </>
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
