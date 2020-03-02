import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

export default function TextArea({ name, value, onChange }) {
  return (
    <div>
      <TextField
        id="outlined-textarea"
        label="Task text"
        placeholder="Type task text"
        multiline
        rows="8"
        variant="outlined"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
