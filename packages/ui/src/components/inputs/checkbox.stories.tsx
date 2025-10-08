import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, type CheckboxProps } from "../inputs/checkbox";
import { Stack } from "../layout/stack";

const sizeOptions = ["sm", "md", "lg"] as const satisfies CheckboxProps["inputSize"][];

const meta = {
  title: "Form/Checkbox",
  component: Checkbox,
  argTypes: {
    inputSize: {
      control: "radio",
      options: sizeOptions,
    },
    disabled: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
  },
  args: {
    inputSize: "md",
    label: "Checkbox",
    disabled: false,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Primary Checkbox",
  },
};

export const CheckboxSizes: Story = {
  render: (args) => (
    <Stack align="center" gap="lg">
      {sizeOptions.map((size) => (
        <Checkbox {...args} key={size} inputSize={size} label={size} />
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Checkbox의 `inputSize` props를 변경하면 크기를 조절할 수 있습니다.",
      },
    },
  },
};

export const CheckboxStates: Story = {
  render: (args) => (
    <Stack align="center" gap="lg">
      <Checkbox {...args} label="Unchecked" />
      <Checkbox {...args} label="Checked" checked />
      <Checkbox {...args} label="Disabled" disabled />
      <Checkbox {...args} label="Checked Disabled" checked disabled />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Checkbox는 `checked`, `disabled` 상태를 가집니다.",
      },
    },
  },
};