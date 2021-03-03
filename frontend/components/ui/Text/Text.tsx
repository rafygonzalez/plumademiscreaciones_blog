/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  FunctionComponent,
  JSXElementConstructor,
  CSSProperties,
} from 'react';
import cn from 'classnames';
import s from './Text.module.css';

interface Props {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode | any;
}

type Variant =
  | 'heading'
  | 'body'
  | 'pageHeading'
  | 'sectionHeading'
  | 'sectionSubtitle'
  | 'articleHeading'
  | 'articleSubtitle'
  | 'dListTitle'
  | 'dListDescription';

const Text: FunctionComponent<Props> = ({
  style,
  className = '',
  variant = 'body',
  children,
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string;
  } = {
    body: 'p',
    heading: 'h1',
    pageHeading: 'h1',
    sectionHeading: 'h2',
    sectionSubtitle: 'h3',
    articleHeading: 'h4',
    articleSubtitle: 'h5',
    dListTitle: 'dt',
    dListDescription: 'dd',
  };

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![variant!];

  return (
    <Component
      className={cn(
        s.root,
        {
          [s.body]: variant === 'body',
          [s.heading]: variant === 'heading',
          [s.pageHeading]: variant === 'pageHeading',
          [s.sectionHeading]: variant === 'sectionHeading',
          [s.sectionSubtitle]: variant === 'sectionSubtitle',
          [s.articleHeading]: variant === 'articleHeading',
          [s.articleSubtitle]: variant === 'articleSubtitle',
          [s.dListTitle]: variant === 'dListTitle',
          [s.dListDescription]: variant === 'dListDescription',
        },
        className
      )}
      style={style}>
      {children}
    </Component>
  );
};

export default Text;
