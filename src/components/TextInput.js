import React from "react";
import TextField from "@material-ui/core/TextField";

export default function SearchInput({ onChange, value, label, type, name }) {
  return (
    <div>
      <TextField
        id="outlined-search"
        label={label}
        type={type}
        variant="outlined"
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
