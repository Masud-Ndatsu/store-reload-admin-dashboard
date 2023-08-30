import React from "react";

type Props = {
  type: string;
  label: string;
  placeholder?: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  name: string;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
};

export const Input = (props: Props) => {
  return (
    <div style={{ margin: "1.5rem 0" }}>
      <label
        style={{
          display: "block",
          margin: "0.35rem 0",
          fontSize: "18px",
          ...props.labelStyle,
        }}
        htmlFor={props.type}
      >
        {props.label}
      </label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        name={props.name}
        value={props.value}
        style={props.inputStyle}
      />
    </div>
  );
};
