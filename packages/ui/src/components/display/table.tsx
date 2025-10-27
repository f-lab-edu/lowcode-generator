import {
  createContext,
  useContext,
  type Ref,
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
export type TableProps = HTMLAttributes<HTMLTableElement> &
  TableVariants & {
    ref?: Ref<HTMLTableElement>;
  };
export function Table({
  variant = "simple",
  color = "base",
  className,
  ref,
  ...props
}: TableProps) {
  const classNames = [tableStyle({ variant, color }), className]
    .filter(Boolean)
    .join(" ");
  return (
    <TableContext.Provider value={{ variant, color }}>
      <table ref={ref} className={classNames} {...props} />
    </TableContext.Provider>
  );
}

// Caption 영역
export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement> & {
  ref?: Ref<HTMLTableCaptionElement>;
};

export function TableCaption({ className, ref, ...props }: TableCaptionProps) {
  const classNames = [tableCaptionStyle(), className].filter(Boolean).join(" ");
  return <caption ref={ref} className={classNames} {...props} />;
}

// Thead (Color 등 varaint 영향 범위)
export type TableHeadProps = HTMLAttributes<HTMLTableSectionElement> &
  Parameters<typeof tableHeadStyle>[0] & {
    ref?: Ref<HTMLTableSectionElement>;
  };

export function Thead({
  className,
  color,
  variant,
  ref,
  ...props
}: TableHeadProps) {
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

// Tbody
export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement> & {
  ref?: Ref<HTMLTableSectionElement>;
};
export function Tbody({ className, ref, ...props }: TableBodyProps) {
  const classNames = [tableBodyStyle, className].filter(Boolean).join(" ");
  return <tbody ref={ref} className={classNames} {...props} />;
}

// TFoot
export type TableFootProps = HTMLAttributes<HTMLTableSectionElement> & {
  ref?: Ref<HTMLTableSectionElement>;
};
export function Tfoot({ className, ref, ...props }: TableFootProps) {
  const classNames = [tableFootStyle, className].filter(Boolean).join(" ");
  return <tfoot ref={ref} className={classNames} {...props} />;
}

// Table Row 영역
export type TableRowProps = HTMLAttributes<HTMLTableRowElement> &
  TableRowVariants & {
    ref?: Ref<HTMLTableRowElement>;
  };
export function Tr({
  hover,
  color,
  variant,
  className,
  ref,
  ...props
}: TableRowProps) {
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

// Table Header Cell
export type TableHeaderCellProps = ThHTMLAttributes<HTMLTableCellElement> &
  TableHeaderCellVariants & {
    ref?: Ref<HTMLTableCellElement>;
  };
export function Th({
  size,
  align,
  color,
  variant,
  className,
  ref,
  ...props
}: TableHeaderCellProps) {
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

// --- TableCell --- //
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement> &
  TableCellVariants & {
    ref?: Ref<HTMLTableCellElement>;
  };
export function Td({
  size,
  align,
  variant,
  className,
  ref,
  ...props
}: TableCellProps) {
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
