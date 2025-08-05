import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon
} from "lucide-react";
import * as React from "react";

import { Button, buttonVariants } from "@/components/Button/Button.component";
import { cn } from "@/utils/cn.utils";
import type { PaginationResponse } from "@/store/services/services.types";
import { usePagination } from "./hooks/usePagination";
import { Input } from "../Input/Input.component";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size
        }),
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Anterior</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Próximo</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

type StandardPaginationProps = {
  onChangePage: (page: number) => void;
  className?: string;
  paginationProps?: PaginationResponse["pagination"];
};

function StandardPagination({
  className,
  paginationProps,
  onChangePage
}: StandardPaginationProps) {
  if (!paginationProps) return null;

  const { page, firstPage, lastPage, hasPrevious, hasNext, totalPages } =
    paginationProps;

  const {
    farFromStart,
    farFromEnd,
    allItemsArray,
    arrayFarFromStart,
    arrayFarFromEnd,
    handleChangePage,
    handleGoBack,
    handleGoForward,
    handleSelectPageInput
  } = usePagination({ page, onChangePage, totalPages });

  const renderPageItems = () => {
    if (!farFromStart && farFromEnd)
      return (
        <>
          {arrayFarFromStart.map((renderPage) => (
            <PaginationItem key={renderPage}>
              <PaginationLink
                isActive={renderPage === page}
                onClick={() => handleChangePage(renderPage)}
              >
                {renderPage}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={page === lastPage}
              onClick={() => handleChangePage(lastPage)}
            >
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        </>
      );

    if (farFromStart && !farFromEnd)
      return (
        <>
          <PaginationItem>
            <PaginationLink
              isActive={page === firstPage}
              onClick={() => handleChangePage(firstPage)}
            >
              {firstPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          {arrayFarFromEnd.map((renderPage) => (
            <PaginationItem key={renderPage}>
              <PaginationLink
                isActive={renderPage === page}
                onClick={() => handleChangePage(renderPage)}
              >
                {renderPage}
              </PaginationLink>
            </PaginationItem>
          ))}
        </>
      );

    if (farFromStart && farFromEnd) {
      return (
        <>
          <PaginationItem>
            <PaginationLink
              isActive={false}
              onClick={() => handleChangePage(firstPage)}
            >
              {firstPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={false}
              onClick={() => handleChangePage(page - 1)}
            >
              {page - 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={true}
              onClick={() => handleChangePage(page)}
            >
              {firstPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={false}
              onClick={() => handleChangePage(page + 1)}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={page === lastPage}
              onClick={() => handleChangePage(lastPage)}
            >
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        </>
      );
    }

    return allItemsArray.map((renderedPage) => (
      <PaginationItem key={renderedPage}>
        <PaginationLink
          isActive={renderedPage === page}
          onClick={() => handleChangePage(renderedPage)}
        >
          {renderedPage}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <Pagination className={cn("h-fit flex gap-2", className)}>
      <PaginationContent>
        {hasPrevious && (
          <>
            <PaginationItem>
              <PaginationPrevious onClick={handleGoBack} />
            </PaginationItem>
          </>
        )}
        {renderPageItems()}
        {hasNext && (
          <>
            <PaginationItem>
              <PaginationNext href="#" onClick={handleGoForward} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
      <div className="flex items-center justify-center gap-2">
        <Input
          className=" [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
          type="number"
          min={1}
          max={totalPages}
          onChange={handleSelectPageInput}
        />
        <span>/ {totalPages}</span>
      </div>
    </Pagination>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  StandardPagination
};
