import cn from "classnames";
import s from "./Checkbox.module.css";
import React, { InputHTMLAttributes } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

const CheckBox: React.FC<Props> = (props) => {
  const { text, className, children, onChange, name, value, checked,...rest } = props;

  const rootClassName = cn(s.root, {}, className);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
    return null;
  };

  return (
    <div>
      <label htmlFor={rest.id} className="inline-flex items-center">
        <input
          checked={checked}
          type="checkbox"
          className={rootClassName}
          onChange={handleOnChange}
          name={name}
          value={value}
        />
        <span className="ml-2">{text}</span>
      </label>
    </div>
  );
};
export default CheckBox;
