import { getComponent } from "@packages/ui";
import { type TreeNode } from "../../types";
import { useSortableDragAndHover } from "../../hooks/useSortableDragAndHover";
import { TableActionButtons } from "./tree-node-table-actions";
import { TableBody } from "./tree-node-table-body";
import { TableHead } from "./tree-node-table-head";
import { useTableNodeEdit } from "../../hooks/useTableNodeEdit";
import "./tree-node-table.css";
interface TableNodeTreeProps {
  rootNode: TreeNode;
}

const TableNodeTree = ({ rootNode }: TableNodeTreeProps) => {
  const { isHovered, setIsHovered, dragProps, handleMouseDown } =
    useSortableDragAndHover(rootNode);

  const Table = getComponent("Table");

  const {
    addColumn,
    removeColumn,
    addRow,
    removeRow,
    updateCellContent,
    getSectionNodes,
  } = useTableNodeEdit(rootNode);

  const { thead, tbody, theadRow, tbodyRows, colCount, rowCount } =
    getSectionNodes(rootNode);

  // 헤더 셀 업데이트 핸들러
  const handleUpdateHeadCell = (colIndex: number, value: string) => {
    updateCellContent("thead", 0, colIndex, value);
  };

  // 바디 셀 업데이트 핸들러
  const handleUpdateBodyCell = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    updateCellContent("tbody", rowIndex, colIndex, value);
  };

  return (
    <div
      ref={dragProps.ref}
      {...dragProps.attributes}
      {...dragProps.listeners}
      style={dragProps.style}
      className="table-tree-node"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDownCapture={handleMouseDown}
    >
      <TableActionButtons
        isHovered={isHovered}
        onAddColumn={addColumn}
        onAddRow={addRow}
      />
      <Table {...rootNode.props}>
        <TableHead
          thead={thead}
          theadRow={theadRow}
          isHovered={isHovered}
          colCount={colCount}
          onUpdateCell={handleUpdateHeadCell}
          onRemoveColumn={removeColumn}
        />

        <TableBody
          tbody={tbody}
          tbodyRows={tbodyRows}
          isHovered={isHovered}
          rowCount={rowCount}
          onUpdateCell={handleUpdateBodyCell}
          onRemoveRow={removeRow}
        />
      </Table>
    </div>
  );
};

TableNodeTree.displayName = "TableNodeTree";

export { TableNodeTree };
