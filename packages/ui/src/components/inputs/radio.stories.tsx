import type { Meta, StoryObj } from "@storybook/react";
import { Radio, type RadioProps } from "../inputs/radio";
import { Stack } from "../layout/stack";

const sizeOptions = ["sm", "md", "lg"] as const satisfies RadioProps["inputSize"][];

const meta = {
  title: "Form/Radio",
  component: Radio,
  argTypes: {
    inputSize: {
      control: "radio",
      options: sizeOptions,
    },
    disabled: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
  },
  args: {
    inputSize: "md",
    label: "Radio",
    disabled: false,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Primary Radio",
  },
};

export const RadioSizes: Story = {
  render: (args) => (
    <Stack align="center" gap="lg">
      {sizeOptions.map((size) => (
        <Radio {...args} key={size} inputSize={size} label={size} />
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Radio의 `inputSize` props를 변경하면 크기를 조절할 수 있습니다.",
      },
    },
  },
};

export const RadioGroup: Story = {
  render: (args) => (
    <Stack align="center" gap="lg">
      <Radio {...args} name="story-radio-group" label="Option 1" value="1" />
      <Radio {...args} name="story-radio-group" label="Option 2" value="2" />
      <Radio {...args} name="story-radio-group" label="Option 3" value="3" />
      <Radio
        {...args}
        name="story-radio-group"
        label="Disabled Option"
        value="4"
        disabled
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "여러 Radio 컴포넌트를 같은 `name`으로 묶어 라디오 그룹을 만들 수 있습니다.",
      },
    },
  },
};