import React, { Component } from "react";
import shortid from "shortid";
import SimpleSelect from "./SelectMD";
import FormSubmitBtn from "./FormSubmitBtn";
import FormCancelBtn from "./FormCancelBtn";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import styles from "./CreateForm.module.css";

export default class CreateForm extends Component {
  state = {
    title: "",
    text: "",
    priority: "normal"
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
              options={["low", "normal", "hight"]}
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
            <FormSubmitBtn edit={edit} type="submit" />
            <FormCancelBtn type="button" onClick={onCancelClick} />
          </div>
        </form>
      </div>
    );
  }
}
