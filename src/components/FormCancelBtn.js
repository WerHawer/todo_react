import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default function FormCancelBtn({ type, onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="secondary"
        type={type}
        onClick={onClick}
      >
        Cancel
      </Button>
    </div>
  );
}

FormCancelBtn.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
