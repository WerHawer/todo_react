import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
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

export default useStyles;
