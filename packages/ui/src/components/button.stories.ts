import type { Meta, StoryObj } from "@storybook/react";
import { Button, type ButtonVariants } from "../components/button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Brand: Story = {
  args: {
    color: "warning",
    size: "md",
    fullWidth: true,
    children: "Button",
  },
};
