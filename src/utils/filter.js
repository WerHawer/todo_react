const filter = (tasks, search, searchStatus, searchPriority) => {
  return tasks
    .filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter(task => (searchStatus ? task.status === searchStatus : task))
    .filter(task => (searchPriority ? task.priority === searchPriority : task));
};

export default filter;
