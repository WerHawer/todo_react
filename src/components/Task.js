import React from "react";
import PropTypes from "prop-types";
import styles from "./Task.module.css";
import TaskDoneBtn from "./TaskDoneBtn";
import TaskEditBtn from "./TaskEditBtn";
import TaskDeleteBtn from "./TaskDeleteBtn";
import { textMask } from "../utils/taskTextMask";

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
    <h2>{task.title ? task.title : `Title id-${task.id}`}</h2>
    <p>{task.text ? task.text : textMask}</p>
    <div className={styles.btnContainer}>
      <TaskDoneBtn type="button" onClick={onDoneBtnClick} />
      <TaskEditBtn type="button" onClick={onEditBtnClick} />
      <TaskDeleteBtn type="button" onClick={onDeleteClick} />
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
