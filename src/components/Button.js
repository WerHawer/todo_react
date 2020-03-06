import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import useStyles from "../utils/btnStyles";

export default function Btn({
  onClick,
  variant,
  color,
  type,
  size,
  name,
  edit
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        name={name}
        variant={variant}
        color={color}
        type={type}
        onClick={onClick}
        size={size}
        className={name === "create" ? classes.create : null}
      >
        {edit ? "edit" : name}
      </Button>
    </div>
  );
}

Btn.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string.isRequired,
  color: PropTypes.string,
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  name: PropTypes.string.isRequired,
  edit: PropTypes.object
};
