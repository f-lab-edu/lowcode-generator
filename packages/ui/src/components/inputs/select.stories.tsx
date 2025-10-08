import type { Meta, StoryObj } from "@storybook/react";
import { Select, type SelectProps } from "../inputs/select";
import { Stack } from "../layout/stack";

const sizeOptions = ["sm", "md", "lg"] as const satisfies SelectProps["inputSize"][];
const exampleOptions = [
  { label: "옵션 1", value: "1" },
  { label: "옵션 2", value: "2" },
  { label: "옵션 3", value: "3" },
  { label: "비활성 옵션", value: "4", disabled: true },
];

const meta = {
  title: "Form/Select",
  component: Select,
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
    options: exampleOptions,
    disabled: false,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Primary Select",
  },
};

export const SelectSizes: Story = {
  render: (args) => (
    <Stack direction="column" gap="lg">
      {sizeOptions.map((size) => (
        <Select {...args} key={size} inputSize={size} label={`${size} Select`} />
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Select의 `inputSize` props를 변경하면 크기를 조절할 수 있습니다.",
      },
    },
  },
};

export const SelectStates: Story = {
  render: (args) => (
    <Stack direction="column" gap="lg">
      <Select {...args} label="Default" />
      <Select {...args} label="Disabled" disabled />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Select는 `disabled` 상태를 가집니다.",
      },
    },
  },
};