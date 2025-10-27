import { useState, useMemo, type ComponentProps } from "react";
import {
  paginationStyle,
  paginationListStyle,
  paginationItemStyle,
  type PaginationVariants,
} from "./pagination.css";
import { cn } from "../../utils/cn";

const usePagination = ({
  count,
  page,
  siblingCount = 1,
  boundaryCount = 1,
}: {
  count: number;
  page: number;
  siblingCount?: number;
  boundaryCount?: number;
}) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 3 + boundaryCount * 2;

    if (totalPageNumbers >= count) {
      return range(1, count);
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, count);

    const shouldShowLeftEllipsis = leftSiblingIndex > boundaryCount + 2;
    const shouldShowRightEllipsis =
      rightSiblingIndex < count - boundaryCount - 1;

    const firstPageRange = range(1, boundaryCount);
    const lastPageRange = range(count - boundaryCount + 1, count);

    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, "ellipsis", ...lastPageRange];
    }

    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(count - rightItemCount + 1, count);
      return [...firstPageRange, "ellipsis", ...rightRange];
    }

    if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [
        ...firstPageRange,
        "ellipsis",
        ...middleRange,
        "ellipsis",
        ...lastPageRange,
      ];
    }

    return range(1, count);
  }, [count, page, siblingCount, boundaryCount]);

  return paginationRange;
};

export type PaginationProps = ComponentProps<"nav"> &
  PaginationVariants & {
    count: number;
    page?: number;
    defaultPage?: number;
    onChange?: (page: number) => void;
    disabled?: boolean;
    siblingCount?: number;
    boundaryCount?: number;
    hidePrevButton?: boolean;
    hideNextButton?: boolean;
    showFirstButton?: boolean;
    showLastButton?: boolean;
  };

export function Pagination({
  count,
  page: controlledPage,
  defaultPage = 1,
  onChange,
  disabled = false,
  siblingCount = 1,
  boundaryCount = 1,
  hidePrevButton = false,
  hideNextButton = false,
  showFirstButton = false,
  showLastButton = false,
  size = "md",
  shape = "rounded",
  variant = "text",
  color = "primary",
  className,
  ...props
}: PaginationProps) {
  const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage);

  const isControlled = controlledPage !== undefined;
  const currentPage = isControlled ? controlledPage : uncontrolledPage;

  const handlePageChange = (newPage: number) => {
    if (disabled || newPage < 1 || newPage > count) return;
    if (!isControlled) setUncontrolledPage(newPage);
    if (onChange) onChange(newPage);
  };

  const paginationItems = usePagination({
    count,
    page: currentPage,
    siblingCount,
    boundaryCount,
  });

  const rootClassName = cn(paginationStyle, className);

  const renderItem = (type: string, pageNum?: number) => {
    const isSelected = pageNum === currentPage;
    const isDisabled =
      disabled ||
      (type === "first" && currentPage === 1) ||
      (type === "previous" && currentPage === 1) ||
      (type === "next" && currentPage === count) ||
      (type === "last" && currentPage === count);

    const content: Record<string, React.ReactNode> = {
      first: "<<",
      previous: "<",
      next: ">",
      last: ">>",
      ellipsis: "...",
      page: pageNum,
    };

    return (
      <button
        className={paginationItemStyle({
          shape,
          size,
          variant,
          color,
          isSelected,
          disabled: isDisabled,
        })}
        disabled={isDisabled}
        onClick={() => pageNum && handlePageChange(pageNum)}
        aria-current={isSelected ? "true" : undefined}
        aria-label={
          type === "page" ? `Go to page ${pageNum}` : `Go to ${type} page`
        }
      >
        {content[type]}
      </button>
    );
  };

  return (
    <nav aria-label="pagination" className={rootClassName} {...props}>
      <ul className={paginationListStyle}>
        {showFirstButton && <li>{renderItem("first", 1)}</li>}
        {!hidePrevButton && <li>{renderItem("previous", currentPage - 1)}</li>}
        {paginationItems.map((item, index) => (
          <li key={index}>
            {item === "ellipsis"
              ? renderItem("ellipsis")
              : renderItem("page", item as number)}
          </li>
        ))}
        {!hideNextButton && <li>{renderItem("next", currentPage + 1)}</li>}
        {showLastButton && <li>{renderItem("last", count)}</li>}
      </ul>
    </nav>
  );
}
