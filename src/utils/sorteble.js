import { Sortable, Plugins } from "@shopify/draggable";

export default function Flexbox() {
  const containers = document.querySelectorAll("#Flexbox");
  let horizontalRule = true;
  const windowWidth = window.innerWidth;

  if (!containers.length) return;

  if (windowWidth < 646) {
    horizontalRule = false;
  }

  const sortable = new Sortable(containers, {
    draggable: ".isDraggable",
    swapAnimation: {
      duration: 100,
      easingFunction: "ease-in-out",
      horizontal: horizontalRule
    },
    mirror: {
      constrainDimensions: true
    },
    plugins: [Plugins.SwapAnimation]
  });

  let moovedCard;

  sortable.on("drag:start", evt => {
    const { tasks } = this.state;

    const card = evt.data.source;
    card.classList.add("graped");
    moovedCard = tasks.find(task => task.id === card.id);
  });

  sortable.on("sortable:stop", evt => {
    const { tasks } = this.state;

    if (evt.data.oldIndex === evt.data.newIndex) return;

    const mixedTasks = tasks.filter((task, index) =>
      index !== evt.data.oldIndex ? task : undefined
    );
    mixedTasks.splice(evt.data.newIndex, 0, moovedCard);

    this.setState({ tasks: mixedTasks });

    return;
  });
}
