import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  FaTrash,
  FaEdit,
  FaFlag,
  FaGripVertical,
  FaBullseye,
} from "react-icons/fa";

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo, onFocus }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: todo.id,
    });

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
    } else {
      dueStatus = `🟢 ${diffDays} Day${diffDays > 1 ? "s" : ""} Left`;
      statusColor = "text-green-500";
    }
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex flex-col md:flex-row md:items-center md:justify-between
      p-6
      rounded-3xl
      backdrop-blur-2xl
      border
      shadow-xl
      transition-all duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      ${
        todo.priority === "High"
          ? "border-l-[8px] border-l-red-500"
          : todo.priority === "Medium"
            ? "border-l-[8px] border-l-yellow-500"
            : "border-l-[8px] border-l-green-500"
      }
      bg-white/60 dark:bg-white/10 border-white/20`}
    >
      {/* Task Information */}
      <div>
        <div className="flex items-center gap-3">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-blue-600"
          >
            <FaGripVertical />
          </button>

          {/* Complete */}
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />

          {/* Task */}
          <span
            className={`text-xl font-semibold transition-all ${
              todo.completed
                ? "line-through text-gray-400"
                : "text-gray-800 dark:text-white"
            }`}
          >
            {todo.text}
          </span>
        </div>

        {/* Created Date */}
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-3">
          📅 {todo.createdAt}
        </p>

        {/* Due Date */}
        <p className="text-sm text-blue-500">
          ⏰ Due: {todo.dueDate || "No Due Date"}
        </p>

        {/* Due Status */}
        {todo.dueDate && (
          <p className={`text-sm font-semibold ${statusColor}`}>{dueStatus}</p>
        )}

        {/* Priority */}
        <div className="mt-2 flex items-center gap-2">
          <FaFlag />

          <span
            className={`px-4 py-2 rounded-full text-white text-xs font-bold shadow-lg ${
              todo.priority === "High"
                ? "bg-red-500"
                : todo.priority === "Medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
            }`}
          >
            {todo.priority}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 text-xl mt-5 md:mt-0">
        {/* Focus */}
        {!todo.completed && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFocus(todo);
            }}
            title="Focus Mode"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <FaBullseye />
          </button>
        )}

        {/* Edit */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            editTodo(todo);
          }}
          title="Edit Task"
          className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg"
        >
          <FaEdit />
        </button>

        {/* Delete */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
          }}
          title="Delete Task"
          className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
