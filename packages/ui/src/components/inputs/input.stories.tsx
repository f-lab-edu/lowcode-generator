import type { Meta, StoryObj } from "@storybook/react";
import { Input, type InputProps } from "../inputs/input";
import { Stack } from "../layout/stack";

const sizeOptions = [
  "sm",
  "md",
  "lg",
] as const satisfies InputProps["inputSize"][];

const meta = {
  title: "Form/Input",
  component: Input,
  argTypes: {
    inputSize: {
      control: "radio",
      options: sizeOptions,
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    width: {
      control: "text",
    },
  },
  args: {
    inputSize: "md",
    placeholder: "입력하세요...",
    disabled: false,
    width: "200px",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    placeholder: "Primary Input",
  },
};

export const InputSizes: Story = {
  render: (args) => (
    <Stack direction="column" gap="lg">
      {sizeOptions.map((size) => (
        <Input
          {...args}
          key={size}
          inputSize={size}
          placeholder={`${size} size`}
        />
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Input의 `inputSize` props를 변경하면 크기를 조절할 수 있습니다.",
      },
    },
  },
  args: {
    width: "100%",
  },
};

export const InputStates: Story = {
  render: (args) => (
    <Stack direction="column" gap="lg">
      <Input {...args} placeholder="Default" />
      <Input {...args} value="Filled" />
      <Input {...args} placeholder="Disabled" disabled />
      <Input {...args} value="Filled Disabled" disabled />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Input은 `disabled` 상태와 `placeholder`를 가집니다.",
      },
    },
  },
};
