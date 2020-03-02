import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: 100
    }
  },
  create: {
    borderRadius: "50%",
    backgroundColor: blue[900],
    height: 100,
    boxShadow: "3px 4px 11px -1px rgba(0, 0, 0, 0.75)",
    position: "fixed",
    bottom: 20,
    right: 20
  }
}));

export default function CreateTaskBtn({ onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={onClick}
        size="large"
        className={classes.create}
      >
        Create
      </Button>
    </div>
  );
}

CreateTaskBtn.propTypes = {
  onClick: PropTypes.func.isRequired
};
