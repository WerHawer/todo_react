import React, { Component } from "react";
import Tasks from "./components/Tasks";
import Btn from "./components/Button";
import CreateForm from "./components/CreateForm";
import TextInput from "./components/TextInput";
import SimpleSelect from "./components/SelectMD";
import styles from "./App.module.css";
import Flexbox from "./utils/sorteble";
import filter from "./utils/filter";
import localStorage from "./utils/localStorage";
import statusOptions from "./utils/statusOptions";
import priorityOptions from "./utils/priorityOptions";

export default class App extends Component {
  state = {
    tasks: [],
    modalIsOpen: false,
    edit: null,
    search: "",
    searchStatus: "",
    searchPriority: ""
  };

  FlexApp = Flexbox;

  componentDidMount() {
    this.FlexApp();
    const tasksLS = localStorage.load("tasksLS");

    if (tasksLS) this.setState({ tasks: tasksLS });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tasks !== this.state.tasks)
      localStorage.save("tasksLS", this.state.tasks);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOpenFormCreateTask = () => {
    window.scrollTo(0, 0);
    this.setState({ modalIsOpen: true });
    document.body.classList.add("scrollHide");
  };

  handleAddTask = obj => {
    this.setState(state => ({ tasks: [obj, ...state.tasks] }));
    this.setState({ modalIsOpen: false });
  };

  onCancelClick = () => {
    this.setState({ modalIsOpen: false, edit: null });
    document.body.classList.remove("scrollHide");
  };

  onDeleteClick = e => {
    const { tasks } = this.state;
    const card = e.target.closest("li");
    const afterDel = tasks.filter(task => task.id !== card.id);
    this.setState({ tasks: afterDel });
  };

  onDoneBtnClick = e => {
    const { tasks } = this.state;
    const card = e.target.closest("li");
    const doneTasks = tasks.map(task =>
      task.id === card.id ? { ...task, status: "done" } : task
    );
    this.setState({ tasks: doneTasks });
  };

  onEditBtnClick = e => {
    window.scrollTo(0, 0);
    document.body.classList.add("scrollHide");
    const { tasks } = this.state;
    const card = e.target.closest("li");
    const editedTask = tasks.find(task => card.id === task.id);
    this.setState({ edit: editedTask, modalIsOpen: true });
  };

  onEditedSubmit = obj => {
    const { tasks } = this.state;
    const edited = tasks.map(task => (task.id === obj.id ? obj : task));
    this.setState({ tasks: edited });
    this.setState({ modalIsOpen: false, edit: null });
  };

  render() {
    const {
      tasks,
      modalIsOpen,
      edit,
      search,
      searchStatus,
      searchPriority
    } = this.state;

    const filteredTasks = filter(tasks, search, searchStatus, searchPriority);

    return (
      <div>
        <div className={`wrapper ${styles.appWrapper}`}>
          <TextInput
            onChange={this.handleChange}
            value={search}
            name="search"
            type="serch"
            label="Search by title"
          />
          <div className={styles.selectWrapper}>
            <SimpleSelect
              onChange={this.handleChange}
              title="Priority"
              options={priorityOptions}
              name="searchPriority"
              value={searchPriority}
            />
            <SimpleSelect
              title="Status"
              options={statusOptions}
              name="searchStatus"
              onChange={this.handleChange}
              value={searchStatus}
            />
          </div>
        </div>

        <Tasks
          realTasks={tasks}
          tasks={filteredTasks}
          onDeleteClick={this.onDeleteClick}
          onDoneBtnClick={this.onDoneBtnClick}
          onEditBtnClick={this.onEditBtnClick}
          search={search}
          searchPriority={searchPriority}
          searchStatus={searchStatus}
        />

        <Btn
          onClick={this.handleOpenFormCreateTask}
          name="create"
          variant="contained"
          color="primary"
          type="button"
          size="large"
        />

        {modalIsOpen && (
          <CreateForm
            onSubmitForm={this.handleAddTask}
            edit={edit}
            onCancelClick={this.onCancelClick}
            onEditedSubmit={this.onEditedSubmit}
          />
        )}
      </div>
    );
  }
}
