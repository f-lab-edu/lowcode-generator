import {
  createContext,
  useContext,
  forwardRef,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import {
  table as tableStyle,
  tableCaption as tableCaptionStyle,
  tableHead as tableHeadStyle,
  tableBody as tableBodyStyle,
  tableFoot as tableFootStyle,
  tableRow as tableRowStyle,
  tableHeaderCell as tableHeaderCellStyle,
  tableCell as tableCellStyle,
  type TableVariants,
  type TableRowVariants,
  type TableHeaderCellVariants,
  type TableCellVariants,
} from "./table.css";

const TableContext = createContext<TableVariants>({
  variant: "simple",
  color: "base",
});
const useTableContext = () => useContext(TableContext);

// Table
export type TableProps = HTMLAttributes<HTMLTableElement> & TableVariants;
const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ variant = "simple", color = "base", className, ...props }, ref) => {
    const classNames = [tableStyle({ variant, color }), className]
      .filter(Boolean)
      .join(" ");
    return (
      <TableContext.Provider value={{ variant, color }}>
        <table ref={ref} className={classNames} {...props} />
      </TableContext.Provider>
    );
  }
);
Table.displayName = "Table";

// Caption 영역
export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;
const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => {
    const classNames = [tableCaptionStyle(), className]
      .filter(Boolean)
      .join(" ");
    return <caption ref={ref} className={classNames} {...props} />;
  }
);
TableCaption.displayName = "TableCaption";

// Thead (Color 등 varaint 영향 범위)
export type TableHeadProps = HTMLAttributes<HTMLTableSectionElement> &
  Parameters<typeof tableHeadStyle>[0];
const Thead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, color, variant, ...props }, ref) => {
    const { variant: ctxVariant, color: ctxColor } = useTableContext();
    const finalColor = color || ctxColor;
    const finalVariant = variant || ctxVariant;

    const classNames = [
      tableHeadStyle({ variant: finalVariant, color: finalColor }),
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <thead ref={ref} className={classNames} {...props} />;
  }
);
Thead.displayName = "Thead";

// Tbody
export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
const Tbody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => {
    const classNames = [tableBodyStyle, className].filter(Boolean).join(" ");
    return <tbody ref={ref} className={classNames} {...props} />;
  }
);
Tbody.displayName = "Tbody";

// TFoot
export type TableFootProps = HTMLAttributes<HTMLTableSectionElement>;
const Tfoot = forwardRef<HTMLTableSectionElement, TableFootProps>(
  ({ className, ...props }, ref) => {
    const classNames = [tableFootStyle, className].filter(Boolean).join(" ");
    return <tfoot ref={ref} className={classNames} {...props} />;
  }
);
Tfoot.displayName = "Tfoot";

// Table Row 영역
export type TableRowProps = HTMLAttributes<HTMLTableRowElement> &
  TableRowVariants;
const Tr = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ hover, color, variant, className, ...props }, ref) => {
    const { variant: ctxVariant, color: ctxColor } = useTableContext();
    const finalVariant = variant || ctxVariant;
    const finalColor = color || ctxColor;

    const classNames = [
      tableRowStyle({ variant: finalVariant, hover, color: finalColor }),
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <tr ref={ref} className={classNames} {...props} />;
  }
);
Tr.displayName = "Tr";

// Table Header Cell
export type TableHeaderCellProps = ThHTMLAttributes<HTMLTableCellElement> &
  TableHeaderCellVariants;
const Th = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ size, align, color, variant, className, ...props }, ref) => {
    const { variant: ctxVariant, color: ctxColor } = useTableContext();
    const finalColor = color || ctxColor;
    const finalVariant = variant || ctxVariant;

    const classNames = [
      tableHeaderCellStyle({
        size,
        align,
        color: finalColor,
        variant: finalVariant,
      }),
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <th ref={ref} className={classNames} {...props} />;
  }
);
Th.displayName = "Th";

// --- TableCell --- //
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement> &
  TableCellVariants;
const Td = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ size, align, variant, className, ...props }, ref) => {
    const { variant: ctxVariant } = useTableContext();
    const finalVariant = variant || ctxVariant;

    const classNames = [
      tableCellStyle({ size, align, variant: finalVariant }),
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <td ref={ref} className={classNames} {...props} />;
  }
);
Td.displayName = "Td";

export { Table, TableCaption, Thead, Tbody, Tfoot, Tr, Th, Td };
