import React from "react";

const Select = ({ onChange, data, label }) => {
  return (
    <div style={filterStyle}>
      <label htmlFor={label}>{label}: </label>
      <select name={label} onChange={onChange}>
        {data.map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;

const filterStyle = {
  pointer: "cursor",
  width: "fit-content",
  margin: "0 auto",
  border: "1px solid black",
  padding: "0.5rem",
};
