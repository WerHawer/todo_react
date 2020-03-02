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

export default function FormSubmitBtn({ edit, type }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" type={type}>
        {edit ? "Edit" : "Save"}
      </Button>
    </div>
  );
}

FormSubmitBtn.propTypes = {
  type: PropTypes.string.isRequired,
  edit: PropTypes.object
};
