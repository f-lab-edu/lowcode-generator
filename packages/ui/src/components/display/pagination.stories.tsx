import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "../layout/stack";
import { Pagination } from "./pagination";

const meta = {
  title: "Display/Pagination",
  component: Pagination,
  argTypes: {
    count: { control: "number" },
    page: { control: "number" },
    defaultPage: { control: "number" },
    disabled: { control: "boolean" },
    siblingCount: { control: "number" },
    boundaryCount: { control: "number" },
    hidePrevButton: { control: "boolean" },
    hideNextButton: { control: "boolean" },
    showFirstButton: { control: "boolean" },
    showLastButton: { control: "boolean" },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "radio",
      options: ["text", "outlined"],
    },
    shape: {
      control: "radio",
      options: ["rounded", "circular"],
    },
    color: {
      control: "radio",
      options: ["primary", "secondary", "tertiary"],
    },
  },
  args: {
    count: 20,
    page: 10,
    disabled: false,
    siblingCount: 1,
    boundaryCount: 1,
    hidePrevButton: false,
    hideNextButton: false,
    showFirstButton: false,
    showLastButton: false,
    size: "md",
    variant: "text",
    shape: "rounded",
    color: "primary",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    count: 10,
    page: 1,
  },
};

export const Colors: Story = {
  render: (args) => (
    <Stack direction="column" gap="lg" align="center">
      <Pagination {...args} color="primary" />
      <Pagination {...args} color="secondary" />
      <Pagination {...args} color="tertiary" />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="column" gap="lg" align="center">
      <Pagination {...args} size="sm" />
      <Pagination {...args} size="md" />
      <Pagination {...args} size="lg" />
    </Stack>
  ),
};

export const VariantsAndShapes: Story = {
  render: (args) => (
    <Stack direction="column" gap="lg" align="center">
      <Pagination {...args} variant="text" shape="rounded" />
      <Pagination {...args} variant="outlined" shape="rounded" />
      <Pagination {...args} variant="text" shape="circular" />
      <Pagination {...args} variant="outlined" shape="circular" />
    </Stack>
  ),
};

export const FullPagination: Story = {
  args: {
    count: 20,
    page: 10,
    siblingCount: 2,
    boundaryCount: 2,
    showFirstButton: true,
    showLastButton: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
