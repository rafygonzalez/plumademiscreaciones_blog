import cn from 'classnames';
import React, { FC, ReactNode, Component, Fragment } from 'react';
import s from './Grid.module.css';

interface Props {
  className?: string;
  children?: ReactNode | Component | ReactNode[] | Component[] | any[];
  spacing?: number;
  container?: boolean;
  item?: boolean;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number
}

const Grid: FC<Props> = ({
  className,
  children,
  spacing,
  container,
  item,
  xs,
  sm,
  md,
  lg,
  xl
}) => {
  const bpProps = {
    xs,
    sm,
    md,
    lg,
    xl
  };
  const breakpoints = Object.keys(bpProps)
    .filter((name) => typeof bpProps[name] !== 'undefined')
    .map((bpn) => `${bpn}:col-span-${bpProps[bpn]}`)
    .toString()
    .replace(',', ' ');
  const spacingStyle = `gap-${spacing}`;
  const rootClassName = cn(s.root, className, spacingStyle);
  const itemClassName = cn(s.item, breakpoints);
  
  const renderComponent = () => {
    if (container) return <div className={rootClassName}>{children}</div>;
    else if (item) return <div className={itemClassName}>{children}</div>;
    throw new Error(
      'You must assign to Grid Component the properties "container" or "item"'
    );
  };
  return <Fragment>{renderComponent()}</Fragment>;
};
export default Grid;
