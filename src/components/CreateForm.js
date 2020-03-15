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

  handleEdit = e => {
    e.preventDefault();

    const { onEditedSubmit } = this.props;
    const editedObj = this.onEdit();
    onEditedSubmit(editedObj);
    document.body.classList.remove("scrollHide");
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmitForm } = this.props;
    const obj = this.onSubmit();
    onSubmitForm(obj);
    this.setState({ title: "", text: "" });
    document.body.classList.remove("scrollHide");
  };

  handleCloseOnGrey = e =>
    e.target === e.currentTarget ? this.props.onCancelClick() : null;

  render() {
    const { title, text, priority } = this.state;
    const { onCancelClick, edit } = this.props;
    const windowWidth = window.innerWidth;

    return (
      <div
        className={styles.createWrapper}
        onClick={windowWidth > 646 ? this.handleCloseOnGrey : null}
      >
        <form
          className={styles.form}
          onSubmit={edit ? this.handleEdit : this.handleSubmit}
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
