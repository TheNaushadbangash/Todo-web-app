import { useState } from "react";
import Calendar from "react-calendar";
import "../calendar.css";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="relative w-[95%] max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-gray-900 p-8 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">📅 Task Calendar</h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          >
            ✕
          </button>
        </div>

        <div className="rounded-3xl overflow-hidden">
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            tileContent={({ date }) => {
              const tasks = getTasks(date);

              if (tasks.length > 0) {
                return (
                  <div className="flex justify-center mt-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        tasks.some((t) => !t.completed)
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    ></span>
                  </div>
                );
              }

              return null;
            }}
          />
        </div>

        {/* Tasks */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">
            📋 Tasks on {selectedDate.toDateString()}
          </h3>

          {selectedTasks.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">
              No tasks on this date.
            </p>
          ) : (
            <div className="space-y-3">
              {selectedTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-3xl p-5 bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  <h4 className="font-bold text-lg">{task.text}</h4>

                  <p>🏷 Priority: {task.priority}</p>

                  <p>📂 Category: {task.category}</p>

                  <p>{task.completed ? "✅ Completed" : "⏳ Pending"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
