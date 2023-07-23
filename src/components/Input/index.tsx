import React from "react";

type Props = {
  type: string;
  label: string;
  placeholder?: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  name: string;
};

export const Input = (props: Props) => {
  return (
    <div>
      <label
        style={{ display: "block", margin: "0.35rem 0" }}
        htmlFor={props.type}>
        {props.label}
      </label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        name={props.name}
        value={props.value}
      />
    </div>
  );
};
