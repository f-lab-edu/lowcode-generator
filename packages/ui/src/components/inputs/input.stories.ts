import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../inputs/input";

const meta = {
  title: "Form/Input",
  component: Input,
  argTypes: {
    inputSize: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    inputSize: "md",
    width: "300px",
    placeholder: "text를 입력하세요.",
  },
};
