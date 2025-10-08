import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "../inputs/radio";

const meta = {
  title: "Form/Radio",
  component: Radio,
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
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    inputSize: "md",
    label: "Radio",
  },
};
