import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "../inputs/select";

const meta = {
  title: "Form/Select",
  component: Select,
  argTypes: {
    inputSize: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    inputSize: "md",
    width: "300px",
    options: [
      { label: "예시 1", value: "1" },
      { label: "예시 2", value: "2" },
      { label: "예시 3", value: "3" },
      { label: "예시 4", value: "4" },
    ],
  },
};
