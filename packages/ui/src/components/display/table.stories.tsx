import type { Meta, StoryObj } from "@storybook/react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from "./table";

const meta = {
  title: "Display/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["simple", "bordered", "striped"],
    },
    color: {
      control: "select",
      options: ["base", "primary", "secondary", "tertiary"],
    },
  },
  args: {
    variant: "simple",
    color: "base",
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

const MOCK_TABLE_DATA = [
  {
    rownum: "1",
    status: "Approved",
    title: "Request for approval by User 1 (new)",
    author: "user1",
  },
  {
    rownum: "2",
    status: "Pending",
    title: "Request for approval by User 2",
    author: "user2",
  },
  {
    rownum: "3",
    status: "Rejected",
    title: "Request for approval by User 3 (2nd)",
    author: "user3",
  },
  {
    rownum: "4",
    status: "Approved",
    title: "Request for approval by User 1",
    author: "user1",
  },
  {
    rownum: "5",
    status: "Pending",
    title: "Request for approval by User 3",
    author: "user3",
  },
];

export const Primary: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>Recent rownums</TableCaption>
      <Thead>
        <Tr>
          <Th>Rownum</Th>
          <Th>Status</Th>
          <Th>Title</Th>
          <Th align="right">Author</Th>
        </Tr>
      </Thead>
      <Tbody>
        {MOCK_TABLE_DATA.map((rownum) => (
          <Tr key={rownum.rownum}>
            <Td>{rownum.rownum}</Td>
            <Td>{rownum.status}</Td>
            <Td>{rownum.title}</Td>
            <Td align="right">{rownum.author}</Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Td colSpan={3}>Total Count</Td>
          <Td align="right">5</Td>
        </Tr>
      </Tfoot>
    </Table>
  ),
};

export const Striped: Story = {
  ...Primary,
  args: {
    variant: "striped",
    color: "base",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`variant='striped'`로 설정하면 행마다 배경색이 교차로 적용됩니다.",
      },
    },
  },
};

export const HoverEffect: Story = {
  render: (args) => (
    <Table {...args}>
      <Thead>
        <Tr>
          <Th>Rownum</Th>
          <Th>Status</Th>
          <Th>Title</Th>
          <Th align="right">Author</Th>
        </Tr>
      </Thead>
      <Tbody>
        {MOCK_TABLE_DATA.map((rownum) => (
          <Tr key={rownum.rownum} hover>
            <Td>{rownum.rownum}</Td>
            <Td>{rownum.status}</Td>
            <Td>{rownum.title}</Td>
            <Td align="right">{rownum.author}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`Tr` 컴포넌트에 `hover` prop을 추가하여 마우스 오버 효과를 줄 수 있습니다.",
      },
    },
  },
};

export const Align: Story = {
  render: (args) => (
    <Table {...args}>
      <Thead>
        <Tr>
          <Th align="center">Rownum</Th>
          <Th align="center">Status</Th>
          <Th align="center">Title</Th>
          <Th align="center">Author</Th>
        </Tr>
      </Thead>
      <Tbody>
        {MOCK_TABLE_DATA.map((rownum) => (
          <Tr key={rownum.rownum}>
            <Td align="center">{rownum.rownum}</Td>
            <Td align="center">{rownum.status}</Td>
            <Td align="left">{rownum.title}</Td>
            <Td align="center">{rownum.author}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`Th`와 `Td` 컴포넌트의 `align` prop을 조절하여 셀의 정렬을 조절할 수 있습니다.",
      },
    },
  },
};
