import { type ComponentMetaDefinition } from "../../types/meta";
import {
  THEME_COLOR_VARIANTS,
} from "@packages/vanilla-extract-config";
import { Table, Thead, Tbody, Tr, Th, Td } from "./table";

const tableScaffold = `
<Thead>
  <Tr>
    <Th>제목 1</Th>
    <Th>제목 2</Th>
  </Tr>
</Thead>
<Tbody>
  <Tr>
    <Td>내용 1</Td>
    <Td>내용 2</Td>
  </Tr>
</Tbody>
`;

export const TableMeta: ComponentMetaDefinition = {
  component: "Table",
  category: "Display",
  description: "데이터를 행과 열로 정리하여 보여주는 테이블입니다.",
  props: {
    variant: {
      control: "radio",
      options: ["simple", "striped"],
      default: "simple",
      description: "테이블의 전체적인 스타일 변형",
    },
    color: {
      control: "select",
      options: [...THEME_COLOR_VARIANTS],
      default: "base",
      description: "테이블의 강조 색상",
    },
  },
  renderPreview: (Component, props) => {
    return (
      <Table {...props}>
        <Thead>
          <Tr>
            <Th>Header 1</Th>
            <Th>Header 2</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Cell 1</Td>
            <Td>Cell 2</Td>
          </Tr>
          <Tr>
            <Td>Cell 3</Td>
            <Td>Cell 4</Td>
          </Tr>
        </Tbody>
      </Table>
    );
  },
  scaffold: tableScaffold,
};
