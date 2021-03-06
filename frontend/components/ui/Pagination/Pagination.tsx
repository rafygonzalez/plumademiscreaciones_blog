import cn from "classnames";
import s from "./Pagination.module.css";
import React from "react";
import Button from "../Button";
import PageNumberBox from "./PageNumberBox";

export interface Props {
  className?: string;
  pages: number;
  currentPage: number;
  handlePagination(...args: any[]): void;
}

const Pagination: React.FC<Props> = (props) => {
  const { className, handlePagination, currentPage, pages, ...rest } = props;
  const rootClassName = cn(s.root, {}, className);
  const onPrevious = () => {
    handlePagination("prev");
  };
  const onNext = () => {
    handlePagination("next");
  };
  return (
    <div className={rootClassName}>
      <Button disabled={currentPage <= 1} onClick={onPrevious}>
        Atras
      </Button>
      <div className="inline-flex">
        {Array(pages)
          .fill(0)
          .map((_, i) => (
            <PageNumberBox key={i + 1} number={i + 1} selected={currentPage === i+1} />
          ))}
      </div>
      <Button disabled={currentPage >= pages} onClick={onNext}>
        Siguiente
      </Button>
    </div>
  );
};
export default Pagination;
