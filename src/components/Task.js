import React from "react";
import PropTypes from "prop-types";
import styles from "./Task.module.css";
import { textMask } from "../utils/taskTextMask";
import Btn from "./Button";

const Task = ({
  onDeleteClick,
  onDoneBtnClick,
  onEditBtnClick,
  task,
  searchStatus,
  searchPriority,
  search
}) => (
  <li
    id={task.id}
    className={`${
      task.status === "done" ? styles.taskDone : styles.listElement
    } ${!search && !searchPriority && !searchStatus ? "isDraggable" : null}`}
  >
    <span className={styles[`priority--${task.priority}`]}>
      {task.priority}
    </span>
    <h2>{task.title}</h2>
    <p>{task.text}</p>
    <div className={styles.btnContainer}>
      <Btn
        type="button"
        onClick={onDoneBtnClick}
        variant="outlined"
        color="primary"
        name="done"
      />
      <Btn
        type="button"
        onClick={onEditBtnClick}
        variant="outlined"
        name="edit"
      />

      <Btn
        type="button"
        onClick={onDeleteClick}
        variant="outlined"
        color="secondary"
        name="delete"
      />
    </div>
  </li>
);

export default Task;

Task.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onDoneBtnClick: PropTypes.func.isRequired,
  onEditBtnClick: PropTypes.func.isRequired,
  task: PropTypes.object,
  searchStatus: PropTypes.string,
  searchPriority: PropTypes.string,
  search: PropTypes.string
};
