import { getComponent } from "@packages/ui";
import { type TreeNode } from "../../types";
import { TableCellInput } from "./tree-node-table-cell-input";
import { DeleteColumnButton } from "./tree-node-table-actions";

interface TableHeadProps {
  thead: TreeNode | undefined;
  theadRow: TreeNode | undefined;
  isHovered: boolean;
  colCount: number;
  onUpdateCell: (colIndex: number, value: string) => void;
  onRemoveColumn: (colIndex: number) => void;
}

const TableHead = ({
  thead,
  theadRow,
  isHovered,
  colCount,
  onUpdateCell,
  onRemoveColumn,
}: TableHeadProps) => {
  const Thead = getComponent("Thead");
  const Tr = getComponent("Tr");
  const Th = getComponent("Th");

  if (!thead) return null;

  return (
    <Thead>
      <Tr>
        {theadRow?.children.map((thNode, colIndex) => (
          <Th key={thNode.id} style={{ position: "relative" }}>
            <TableCellInput
              value={thNode.props.children}
              onChange={(value) => onUpdateCell(colIndex, value)}
              borderColor="#4CAF50"
            />
            <DeleteColumnButton
              isHovered={isHovered}
              colCount={colCount}
              onDelete={() => onRemoveColumn(colIndex)}
            />
          </Th>
        ))}
      </Tr>
    </Thead>
  );
};

TableHead.displayName = "TableHead";

export { TableHead };
