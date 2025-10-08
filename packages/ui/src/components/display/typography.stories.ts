import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../display/typography";
import { TYPOGRAPHY_ROLES } from "@packages/vanilla-extract-config";

const meta = {
  title: "Display/Typography",
  component: Typography,
  argTypes: {
    role: {
      control: "select",
      options: [...TYPOGRAPHY_ROLES],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    role: "headingXl",
    as: "span",
    children: "Typography",
  },
};
