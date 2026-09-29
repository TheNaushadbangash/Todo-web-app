import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaTrash, FaEdit, FaFlag, FaGripVertical } from "react-icons/fa";
import { Clock3, CheckCircle2, Play } from "lucide-react";

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo, onFocus }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = todo.dueDate ? new Date(todo.dueDate) : null;

  let dueStatus = "";
  let statusColor = "";

  if (due) {
    due.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      dueStatus = "🔴 Overdue";
      statusColor = "text-red-500";
    } else if (diffDays === 0) {
      dueStatus = "🟡 Due Today";
      statusColor = "text-yellow-500";
    } else if (diffDays === 1) {
      dueStatus = "🟢 Tomorrow";
      statusColor = "text-green-500";
    } else {
      dueStatus = `🟢 ${diffDays} Days Left`;
      statusColor = "text-green-500";
    }
  }

  const priorityStyle =
    todo.priority === "High"
      ? "border-l-red-500"
      : todo.priority === "Medium"
        ? "border-l-yellow-500"
        : "border-l-green-500";

  const priorityBadge =
    todo.priority === "High"
      ? "bg-red-500"
      : todo.priority === "Medium"
        ? "bg-yellow-500"
        : "bg-green-500";

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`
    group
    relative
    overflow-hidden
    flex
    flex-col
    md:flex-row
    md:items-center
    md:justify-between
    gap-5
    p-6
    rounded-3xl
    bg-white/55
    backdrop-blur-2xl
    border
    border-white/50
    border-l-[7px]
    ${priorityStyle}
    shadow-xl
    transition-all
    duration-500
    hover:-translate-y-2
    hover:shadow-2xl
  `}
    >
      {/* Hover Glow */}
      <div
        className="
          absolute
          -right-16
          -top-16
          w-40
          h-40
          rounded-full
          bg-blue-400/10
          blur-3xl
          transition-all
          duration-500
          group-hover:scale-150
        "
      />

      {/* Task Information */}
      <div className="relative flex-1">
        <div className="flex items-center gap-3">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="
              cursor-grab
              active:cursor-grabbing
              text-gray-400
              hover:text-blue-600
              transition-all
              duration-300
              hover:scale-125
            "
          >
            <FaGripVertical />
          </button>

          {/* Checkbox */}
          <button
            onClick={() => toggleComplete(todo.id)}
            className={`
  w-8
  h-8
  rounded-full
  flex
  items-center
  justify-center
  border-2
  transition-all
  duration-300
  shadow-sm
  ${
    todo.completed
      ? "bg-green-500 border-green-500 text-white scale-110 shadow-green-500/40"
      : "bg-white/60 border-gray-300 hover:border-blue-500 hover:scale-110 hover:shadow-lg"
  }
`}
          >
            {todo.completed && <CheckCircle2 size={18} />}
          </button>

          {/* Task Text */}
          <span
            className={`
              text-xl
              font-bold
              transition-all
              duration-300
              ${
                todo.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800 group-hover:text-blue-600"
              }
            `}
          >
            {todo.text}
          </span>
        </div>

        {/* Created Date */}
        <p className="text-sm text-gray-500 mt-3 ml-10">
          📅 Created: {todo.createdAt}
        </p>

        {/* Due Date */}
        <div className="flex items-center gap-2 mt-2 ml-10">
          <Clock3 size={16} className="text-blue-500" />

          <p className="text-sm text-blue-500 font-medium">
            Due: {todo.dueDate || "No Due Date"}
          </p>
        </div>

        {/* Due Status */}
        {todo.dueDate && (
          <p
            className={`
              text-sm
              font-bold
              mt-2
              ml-10
              ${statusColor}
            `}
          >
            {dueStatus}
          </p>
        )}

        {/* Priority */}
        <div className="mt-3 ml-10 flex items-center gap-2">
          <FaFlag className="text-gray-500" />

          <span
            className={`
              px-4
              py-1.5
              rounded-full
              text-white
              text-xs
              font-bold
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
              ${priorityBadge}
            `}
          >
            {todo.priority}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="relative flex gap-3">
        {/* Focus Button */}
        {!todo.completed && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFocus?.(todo);
            }}
            className="
              w-12
              h-12
              rounded-2xl
              bg-purple-500
              text-white
              flex
              items-center
              justify-center
              shadow-lg
              transition-all
              duration-300
              hover:scale-110
              hover:-translate-y-1
              active:scale-95
              hover:rotate-3
              hover:shadow-purple-500/40
            "
            title="Focus Mode"
          >
            <Play size={20} />
          </button>
        )}

        {/* Edit */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            editTodo(todo);
          }}
          className="
    w-12
    h-12
    rounded-2xl
    bg-blue-500
    text-white
    flex
    items-center
    justify-center
    shadow-lg
    transition-all
    duration-300
    hover:scale-110
    hover:-translate-y-1
    active:scale-95
    hover:rotate-3
    hover:shadow-blue-500/40
  "
          title="Edit Task"
        >
          <FaEdit />
        </button>

        {/* Delete */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
          }}
          className="
    w-12
    h-12
    rounded-2xl
    bg-red-500
    text-white
    flex
    items-center
    justify-center
    shadow-lg
    transition-all
    duration-300
    hover:scale-110
    hover:-translate-y-1
    active:scale-95
    hover:rotate-3
    hover:shadow-red-500/40
  "
          title="Delete Task"
        >
          <FaTrash />
        </button>
      </div>

      {/* Bottom Animated Line */}
      <div
        className="
          absolute
          bottom-0
          left-0
          h-1
          w-0
          bg-gradient-to-r
          from-cyan-400
          via-blue-500
          to-purple-500
          transition-all
          duration-500
          group-hover:w-full
          transition-all duration-500
hover:-translate-y-2
hover:shadow-2xl
        "
      />
    </li>
  );
}

export default TodoItem;
