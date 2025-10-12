import type { Meta, StoryObj } from "@storybook/react";
import { Textarea, type TextareaProps } from "../inputs/textarea";
import { Stack } from "../layout/stack";

const sizeOptions = [
  "sm",
  "md",
  "lg",
] as const satisfies TextareaProps["inputSize"][];

const meta = {
  title: "Form/Textarea",
  component: Textarea,
  argTypes: {
    inputSize: {
      control: "radio",
      options: sizeOptions,
      description: "Input 요소 사이즈",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    placeholder: {
      control: "text",
      description: "Placeholder",
    },
    width: {
      control: "text",
      description: "Textarea Width (넓이)",
    },
    rows: {
      control: "number",
      description: "Textarea Rows",
    },
  },
  args: {
    inputSize: "md",
    placeholder: "내용을 입력하세요...",
    disabled: false,
    rows: 5,
    width: "100%",
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
        <Textarea
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
          "Textarea의 `inputSize` props를 변경하면 크기를 조절할 수 있습니다.",
      },
    },
  },
};

export const TextareaWidth: Story = {
  render: (args) => (
    <Stack direction="column" gap="lg">
      <Textarea {...args} width={200} placeholder="width: 200px" />
      <Textarea {...args} width="300px" placeholder="width: 300px" />
      <Textarea {...args} width="100%" placeholder="width: 100%" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Textarea의 `width` props를 이용해 너비를 조절할 수 있습니다. 숫자(px)나 문자열을 사용할 수 있습니다.",
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
