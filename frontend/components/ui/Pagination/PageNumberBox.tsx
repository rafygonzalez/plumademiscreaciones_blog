import React from 'react';
import cn from 'classnames';
import s from './PageNumberBox.module.css';


interface Props {
    number: string | number;
    selected: boolean;
}

const PageNumberBox = ({ number, selected }: Props) => {
  return (
    <div
      className={cn(
        s.root,
        {
          [s.selected]: selected,
        }
      )}
    >
      {number}
    </div>
  );
};

export default PageNumberBox;