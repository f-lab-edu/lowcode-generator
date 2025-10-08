import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../inputs/textarea";

const meta = {
  title: "Form/Textarea",
  component: Textarea,
  argTypes: {
    inputSize: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    inputSize: "md",
    cols: 100,
    rows: 5,
  },
};
