import React from "react";
import PropTypes from "prop-types";
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

SearchInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
