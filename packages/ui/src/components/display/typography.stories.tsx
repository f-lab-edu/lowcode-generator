import type { Meta, StoryObj } from "@storybook/react";
import {
  TYPOGRAPHY_ROLES,
  type TypographyRole,
} from "@packages/vanilla-extract-config";
import {
  Typography,
  TYPOGRAPHY_ELEMENT,
  type TypographyElement,
} from "./typography";

const meta = {
  title: "Display/Typography",
  component: Typography,
  argTypes: {
    role: {
      control: "select",
      options: [...TYPOGRAPHY_ROLES],
      description: "타이포그래피 역할과 scale (heading, text 등)",
    },
    as: {
      control: "select",
      options: [...TYPOGRAPHY_ELEMENT],
      description: "타이포그래피 마크업 태그 요소",
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

const heading: Partial<Record<TypographyRole, TypographyElement>> = {
  headingXxl: "h1",
  headingXl: "h2",
  headingLg: "h3",
  headingMd: "h4",
  headingSm: "h5",
  headingXs: "h6",
};

// ✅ 스토리 1: Heading 역할 타이포그래피
export const HeadingTypography: Story = {
  render: (args) => (
    <>
      {Object.entries(heading).map(([key, value]) => (
        <Typography key={value} role={key as keyof typeof heading} as={value}>
          {args.children}
        </Typography>
      ))}
    </>
  ),
  args: {
    children: "Heading Typography",
  },
  parameters: {
    docs: {
      description: {
        story: "Heading에 사용하는 타이포그래피입니다.",
      },
    },
  },
};

// ✅ 스토리 2: Text 역할 타이포그래피
const text: Partial<Record<TypographyRole, TypographyElement>> = {
  textLgRegular: "p",
  textLgSemibold: "p",
  textMdRegular: "p",
  textMdSemibold: "p",
  textSmRegular: "p",
  textSmSemibold: "p",
};

export const TextTypography: Story = {
  render: (args) => (
    <>
      {Object.entries(text).map(([key, value]) => (
        <div key={value}>
          <p>Role: {key}</p>
          <Typography role={key as keyof typeof heading} as={value}>
            {args.children}
          </Typography>
        </div>
      ))}
    </>
  ),
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
  },
  parameters: {
    docs: {
      description: {
        story: "Body, Contenxt text에 사용하는 타이포그래피입니다.",
      },
    },
  },
};

// ✅ 스토리 3: Display 역할 타이포그래피
const display: Partial<Record<TypographyRole, TypographyElement>> = {
  displayLg: "h2",
  displayMd: "h2",
  displaySm: "h2",
};

export const DisplayTypography: Story = {
  render: (args) => (
    <>
      {Object.entries(display).map(([key, value]) => (
        <Typography key={value} role={key as keyof typeof heading} as={value}>
          {args.children}
        </Typography>
      ))}
    </>
  ),
  args: {
    children: "Display Typography",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Logo, Hero section 등 사용자의 주의나 관심을 끄는 영역에 사용하는 Display 타이포그래피입니다.",
      },
    },
  },
};

const caption: Partial<Record<TypographyRole, TypographyElement>> = {
  captionMd: "span",
  captionSm: "span",
};

// ✅ 스토리 4: Caption 역할 타이포그래피
export const CaptionTypography: Story = {
  render: (args) => (
    <>
      {Object.entries(caption).map(([key, value]) => (
        <div key={value}>
          Role : {key} &nbsp;
          <Typography role={key as keyof typeof heading} as={value}>
            {args.children}
          </Typography>
        </div>
      ))}
    </>
  ),
  args: {
    children: "Caption Typography",
  },
  parameters: {
    docs: {
      description: {
        story: "Caption 영역에 사용하는 타이포그래피입니다.",
      },
    },
  },
};

const overline: Partial<Record<TypographyRole, TypographyElement>> = {
  overline: "p",
};

// ✅ 스토리 5: Overline 역할 타이포그래피
export const OverlineTypography: Story = {
  render: (args) => (
    <>
      {Object.entries(overline).map(([key, value]) => (
        <Typography key={value} role={key as keyof typeof heading} as={value}>
          {args.children}
        </Typography>
      ))}
    </>
  ),
  args: {
    children: "Overline Typography",
  },
  parameters: {
    docs: {
      description: {
        story: "Overline 타이포그래피입니다.",
      },
    },
  },
};

const code: Partial<Record<TypographyRole, TypographyElement>> = {
  codeBlock: "pre",
  codeInline: "pre",
};

// ✅ 스토리 6: Code 역할 타이포그래피
export const CodeTypography: Story = {
  render: (args) => (
    <>
      {Object.entries(code).map(([key, value]) => (
        <Typography key={value} role={key as keyof typeof heading} as={value}>
          {args.children}
        </Typography>
      ))}
    </>
  ),
  args: {
    children: "Code Typography",
  },
  parameters: {
    docs: {
      description: {
        story: "Code 타이포그래피입니다.",
      },
    },
  },
};
