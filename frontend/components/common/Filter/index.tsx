import CheckBox from "@components/ui/Checkbox";
import { Filter } from "@lib/filteredResults";
import React, { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  filters: Filter[];
  selectedFilters: string[];
}

const FilterList: FC<Props> = (props) => {
  const {
    className,
    children,
    onChange,
    filters,
    title,
    selectedFilters,
    ...rest
  } = props;

  return (
    <div className="mt-4">
      <span className="text-primary">{title}</span>
      {filters.map((filter, i) => {
        const isChecked = selectedFilters.find(
          (value) => value === filter.criteria.value
        )
          ? true
          : false;
        return (
          <CheckBox
            key={filter.id}
            checked={isChecked}
            onChange={onChange}
            text={filter.label}
            value={filter.criteria.value}
          />
        );
      })}
    </div>
  );
};

export default FilterList;
