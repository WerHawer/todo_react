import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";
import styles from "./Tasks.module.css";

const Tasks = ({
  tasks,
  onDeleteClick,
  onDoneBtnClick,
  onEditBtnClick,
  realTasks,
  search,
  searchPriority,
  searchStatus
}) => (
  <div className="wrapper">
    <ul className={styles.list} id="Flexbox">
      {tasks.length > 0 &&
        tasks.map((task, index) => (
          <Task
            onDeleteClick={onDeleteClick}
            onDoneBtnClick={onDoneBtnClick}
            onEditBtnClick={onEditBtnClick}
            task={task}
            key={task.id}
            index={index}
            search={search}
            searchPriority={searchPriority}
            searchStatus={searchStatus}
          />
        ))}
    </ul>

    {!tasks.length && !realTasks.length && (
      <p className={styles.noTasks}>You don`t have any created tasks</p>
    )}

    {!tasks.length && realTasks.length > 0 && (
      <p className={styles.noTasks}>
        Sorry, I can`t find any tasks of your request
        <span role="img">&#128542;</span>
      </p>
    )}
  </div>
);

export default Tasks;

Tasks.propTypes = {
  tasks: PropTypes.array
};
