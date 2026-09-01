import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

import { CheckCircle2, Clock3, ListTodo } from "lucide-react";
import { arrayMove } from "@dnd-kit/sortable";

import FocusTimer from "./components/FocusTimer";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import CalendarView from "./components/CalendarView";
import Stats from "./components/Stats";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import confetti from "canvas-confetti";
function App() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [focusTodo, setFocusTodo] = useState(null);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Study");

  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem("streak")) || 0;
  });

  const [lastCompletedDate, setLastCompletedDate] = useState(() => {
    return localStorage.getItem("lastCompletedDate") || "";
  });

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    todos.forEach((todo) => {
      if (!todo.dueDate || todo.completed) return;

      const due = new Date(todo.dueDate);
      due.setHours(0, 0, 0, 0);

      const diffDays = Math.floor((due - today) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        toast("🟡 Due Today: " + todo.text, {
          icon: "⏰",
        });
      }

      if (diffDays === 1) {
        toast("🔵 Due Tomorrow: " + todo.text, {
          icon: "📅",
        });
      }

      if (diffDays < 0) {
        toast.error("🔴 Overdue: " + todo.text);
      }
    });
  }, [todos]);

  const addTodo = () => {
    if (!task.trim()) {
      toast.error("Please enter a task");
      return;
    }

    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId
            ? {
                ...todo,
                text: task,
                priority,
                category,
                dueDate,
              }
            : todo,
        ),
      );

      toast.success("Task Updated");
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: task,
        completed: false,
        priority,
        category,
        dueDate,
        createdAt: new Date().toLocaleString(),
      };

      setTodos([...todos, newTodo]);

      toast.success("Task Added");
    }

    setTask("");
    setPriority("Medium");
    setCategory("Study");
    setDueDate("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Task Deleted");
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          const completed = !todo.completed;

          if (completed) {
            confetti({
              particleCount: 120,
              spread: 90,
              origin: { y: 0.7 },
            });

            toast.success("🎉 Task Completed!");
          }
          const today = new Date().toDateString();

          if (lastCompletedDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (
              lastCompletedDate === "" ||
              lastCompletedDate === yesterday.toDateString()
            ) {
              setStreak((prev) => {
                const newStreak = prev + 1;
                localStorage.setItem("streak", newStreak);
                return newStreak;
              });
            } else {
              setStreak(1);
              localStorage.setItem("streak", 1);
            }

            setLastCompletedDate(today);
            localStorage.setItem("lastCompletedDate", today);
          }

          return {
            ...todo,
            completed,
          };
        }

        return todo;
      }),
    );
  };

  const editTodo = (todo) => {
    setTask(todo.text);
    setPriority(todo.priority);
    setCategory(todo.category);
    setDueDate(todo.dueDate);
    setEditId(todo.id);
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    setTodos((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const filteredTodos = todos
    .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    });

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const xp = completedTasks * 10;

  let badge = "🚀 Starter";

  if (completedTasks >= 100) {
    badge = "👑 Master";
  } else if (completedTasks >= 50) {
    badge = "🥇 Pro";
  } else if (completedTasks >= 25) {
    badge = "🥈 Intermediate";
  } else if (completedTasks >= 10) {
    badge = "🥉 Beginner";
  }
  const [showBadgePopup, setShowBadgePopup] = useState(false);
  const [lastBadge, setLastBadge] = useState(() => {
    return localStorage.getItem("lastBadge") || "🚀 Starter";
  });
  useEffect(() => {
    if (badge !== lastBadge) {
      setShowBadgePopup(true);
      setLastBadge(badge);

      localStorage.setItem("lastBadge", badge);

      const timer = setTimeout(() => {
        setShowBadgePopup(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [badge]);

  const completeFocusTask = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo,
      ),
    );

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.7 },
    });

    toast.success("🎉 Focus Session Complete!");

    setFocusTodo(null);
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Todo Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Task", "Priority", "Category", "Due Date", "Status"]],
      body: todos.map((todo) => [
        todo.text,
        todo.priority || "Medium",
        todo.category || "-",
        todo.dueDate || "-",
        todo.completed ? "Completed" : "Pending",
      ]),
    });

    doc.save("Todo-Report.pdf");

    toast.success("📄 PDF Downloaded!");
  };
  return (
    <>
      <Toaster position="top-right" />

      {showBadgePopup && (
        <div className="fixed top-8 right-8 z-50 animate-bounce">
          <div className="rounded-3xl bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-600 p-6 text-white shadow-2xl">
            <h2 className="text-2xl font-bold">🎉 New Badge Unlocked!</h2>

            <p className="mt-2 text-xl">{badge}</p>
          </div>
        </div>
      )}

      <div className="relative min-h-screen flex justify-center items-center p-6 overflow-hidden bg-gradient-to-br from-slate-100 via-blue-100 to-purple-100">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative z-10 w-full max-w-6xl rounded-[35px] backdrop-blur-3xl border border-white/50 bg-white/55 text-black shadow-[0_25px_80px_rgba(0,0,0,0.12)] p-8 transition-all duration-500 hover:shadow-[0_30px_100px_rgba(0,0,0,0.18)]">
          <Navbar />

          {/* Todo Form */}
          <TodoForm
            task={task}
            setTask={setTask}
            addTodo={addTodo}
            priority={priority}
            setPriority={setPriority}
            dueDate={dueDate}
            setDueDate={setDueDate}
            category={category}
            setCategory={setCategory}
          />

          <div className="my-6">
            <input
              type="text"
              placeholder="🔍 Search Task..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl px-5 py-4 bg-white/50 border border-white/40 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-400 backdrop-blur-xl shadow-lg transition-all duration-300"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 rounded-xl font-semibold transition ${
                filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("completed")}
              className={`px-5 py-2 rounded-xl font-semibold transition ${
                filter === "completed"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Completed
            </button>

            <button
              onClick={() => setFilter("pending")}
              className={`px-5 py-2 rounded-xl font-semibold transition ${
                filter === "pending" ? "bg-red-600 text-white" : "bg-gray-200"
              }`}
            >
              Pending
            </button>
          </div>

          <div className="flex justify-end gap-4 mb-6">
            <button
              onClick={exportPDF}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold shadow-xl hover:scale-105 transition-all"
            >
              📄 Export PDF
            </button>

            <button
              onClick={() => setShowCalendar(true)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold shadow-xl hover:scale-105 transition-all"
            >
              📅 Calendar
            </button>
          </div>
          <Stats
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            pendingTasks={pendingTasks}
            completionRate={completionRate}
            todos={todos}
            xp={xp}
            badge={badge}
            streak={streak}
          />
          {showCalendar && (
            <CalendarView
              todos={todos}
              onClose={() => setShowCalendar(false)}
            />
          )}

          {/* Todo List */}
          <TodoList
            todos={filteredTodos}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            handleDragEnd={handleDragEnd}
            onFocus={setFocusTodo}
          />
          {focusTodo && (
            <FocusTimer
              todo={focusTodo}
              onClose={() => setFocusTodo(null)}
              onComplete={completeFocusTask}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
