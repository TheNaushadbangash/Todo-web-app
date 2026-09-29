import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarView({ todos, onClose }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getTasks = (date) => {
    return todos.filter((todo) => {
      if (!todo.dueDate) return false;

      const due = new Date(todo.dueDate);

      return (
        due.getFullYear() === date.getFullYear() &&
        due.getMonth() === date.getMonth() &&
        due.getDate() === date.getDate()
      );
    });
  };

  const selectedTasks = getTasks(selectedDate);

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50
        backdrop-blur-md
        p-4
        animate-[fadeIn_.3s_ease-out]
      "
    >
      <div
        className="
          relative
          w-full max-w-4xl
          max-h-[90vh]
          overflow-y-auto
          rounded-[35px]
          bg-white/90
          backdrop-blur-3xl
          border border-white/60
          shadow-[0_30px_100px_rgba(0,0,0,0.25)]
          p-6 sm:p-8
          animate-[scaleIn_.35s_ease-out]
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
    absolute
    top-5
    right-5
    w-11
    h-11
    rounded-full
    bg-red-500
    text-white
    font-bold
    flex
    items-center
    justify-center
    shadow-lg
    transition-all
    duration-300
    hover:scale-110
    hover:rotate-90
    active:scale-95
    hover:bg-red-600
  "
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-7">
          <div className="flex items-center gap-3">
            <div
              className="
                w-14 h-14
                rounded-2xl
                bg-gradient-to-br
                from-blue-500
                to-purple-600
                flex items-center justify-center
                text-2xl
                shadow-lg
                transition-all duration-500
                hover:scale-110
                hover:rotate-6
              "
            >
              📅
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Task Calendar
              </h2>

              <p className="text-gray-500 text-sm">View your tasks by date</p>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div
          className="
            rounded-3xl
            overflow-hidden
            border border-gray-200
            bg-white
            shadow-lg
            p-3
            transition-all duration-300
            hover:shadow-xl
          "
        >
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            tileContent={({ date }) => {
              const tasks = getTasks(date);

              if (tasks.length === 0) return null;

              return (
                <div className="flex justify-center mt-1">
                  <span
                    className="
                      w-2
                      h-2
                      rounded-full
                      bg-blue-500
                      shadow-sm
                      animate-pulse
                    "
                  />
                </div>
              );
            }}
          />
        </div>

        {/* Selected Date */}
        <div
          className="
            mt-6
            rounded-3xl
            bg-gradient-to-r
            from-blue-50
            to-purple-50
            border border-blue-100
            p-5
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <h3 className="text-xl font-bold text-gray-800">
            📌{" "}
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>

          <p className="text-gray-500 mt-1">
            {selectedTasks.length === 0
              ? "No tasks for this date."
              : `${selectedTasks.length} task${
                  selectedTasks.length > 1 ? "s" : ""
                } scheduled`}
          </p>
        </div>

        {/* Tasks */}
        <div className="mt-5 space-y-3">
          {selectedTasks.map((todo) => (
            <div
              key={todo.id}
              className="
                group
                rounded-2xl
                bg-white
                border border-gray-100
                p-4
                shadow-md
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-xl
                hover:border-blue-200
              "
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4
                    className={`
                      font-bold
                      ${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800 group-hover:text-blue-600"
                      }
                    `}
                  >
                    {todo.text}
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    {todo.category || "General"}
                  </p>
                </div>

                <span
                  className={`
                    px-3 py-1
                    rounded-full
                    text-xs
                    font-bold
                    text-white
                    ${
                      todo.priority === "High"
                        ? "bg-red-500"
                        : todo.priority === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }
                  `}
                >
                  {todo.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
