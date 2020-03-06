import React, { Component } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import SimpleSelect from "./SelectMD";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import styles from "./CreateForm.module.css";
import Btn from "./Button";
import priorityOptions from "../utils/priorityOptions";

export default class CreateForm extends Component {
  state = {
    title: "",
    text: "",
    priority: "normal"
  };

  static propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    edit: PropTypes.object,
    onEditedSubmit: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.edit) {
      const { title, text, priority } = this.props.edit;
      this.setState({ title, text, priority });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "priority" && !e.target.value) {
      alert("You should choose priority");
      this.setState({ priority: "low" });
    }
  };

  onSubmit = () => {
    const { title, text, priority } = this.state;
    return {
      id: shortid.generate(),
      title,
      text,
      priority,
      status: "open",
      created_at: Date.now()
    };
  };

  onEdit = () => {
    let { edit } = this.props;
    const { title, text, priority } = this.state;
    edit = { ...edit, title, text, priority };
    return edit;
  };

  handleCloseOnGrey = e =>
    e.target === e.currentTarget ? this.props.onCancelClick() : null;

  render() {
    const { title, text, priority } = this.state;
    const { onCancelClick, edit, onEditedSubmit } = this.props;

    return (
      <div className={styles.createWrapper} onClick={this.handleCloseOnGrey}>
        <form
          className={styles.form}
          onSubmit={
            edit
              ? e => {
                  e.preventDefault();
                  const editedObj = this.onEdit();
                  onEditedSubmit(editedObj);
                  document.body.classList.remove("scrollHide");
                }
              : e => {
                  e.preventDefault();
                  const obj = this.onSubmit();
                  this.props.onSubmitForm(obj);
                  this.setState({ title: "", text: "" });
                  document.body.classList.remove("scrollHide");
                }
          }
        >
          <div className={styles.priority}>
            <SimpleSelect
              onChange={this.handleChange}
              title="Priority"
              options={priorityOptions}
              name="priority"
              value={priority}
            />
          </div>
          <div className={styles.input}>
            <TextInput
              onChange={this.handleChange}
              value={title}
              name="title"
              type="text"
              label="Create title"
            />
          </div>
          <div className={styles.input}>
            <TextArea name="text" onChange={this.handleChange} value={text} />
          </div>

          <div className={styles.btnContainer}>
            <Btn
              name="save"
              edit={edit}
              type="submit"
              variant="contained"
              color="primary"
            />
            <Btn
              name="cancel"
              type="button"
              onClick={onCancelClick}
              variant="contained"
              color="secondary"
            />
          </div>
        </form>
      </div>
    );
  }
}
