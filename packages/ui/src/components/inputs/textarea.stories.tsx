import type { Meta, StoryObj } from "@storybook/react";
import { Textarea, type TextareaProps } from "../inputs/textarea";
import { Stack } from "../layout/stack";

const sizeOptions = ["sm", "md", "lg"] as const satisfies TextareaProps["inputSize"][];

const meta = {
  title: "Form/Textarea",
  component: Textarea,
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
  },
  args: {
    inputSize: "md",
    placeholder: "내용을 입력하세요...",
    disabled: false,
    rows: 5,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    placeholder: "Primary Textarea",
  },
};

export const TextareaSizes: Story = {
  render: (args) => (
    <Stack direction="column" gap="lg">
      {sizeOptions.map((size) => (
        <Textarea {...args} key={size} inputSize={size} placeholder={`${size} size`} />
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Textarea의 `inputSize` props를 변경하면 크기를 조절할 수 있습니다.",
      },
    },
  },
};

export const TextareaStates: Story = {
  render: (args) => (
    <Stack direction="column" gap="lg">
      <Textarea {...args} placeholder="Default" />
      <Textarea {...args} value="Filled" />
      <Textarea {...args} placeholder="Disabled" disabled />
      <Textarea {...args} value="Filled Disabled" disabled />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Textarea는 `disabled` 상태와 `placeholder`를 가집니다.",
      },
    },
  },
};