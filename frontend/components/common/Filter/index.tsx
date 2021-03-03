import CheckBox from "@components/ui/Checkbox";
import { Filter } from "@lib/filteredResults";
import React from "react";

interface Props {
  title: string;
  name: string;
  filters: Filter[];
}

const FilterList = ({ title, name, filters }: Props) => {
  return (
    <div className="mt-4 block">
      <span className="text-gray-700">{title}</span>
      <div className="mt-2">
        {filters.map((filter) => 
          <CheckBox text={filter.label} value={filter.criteria.value} />
        )}
      </div>
    </div>
  );
};

export default FilterList;
