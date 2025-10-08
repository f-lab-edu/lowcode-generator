import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../inputs/checkbox";

const meta = {
  title: "Form/Checkbox",
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    inputSize: "md",
    label: "Checkbox",
  },
};
