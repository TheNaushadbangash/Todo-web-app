import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";

function TodoForm({
  task,
  setTask,
  addTodo,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  category,
  setCategory,
  darkMode,
}) {
  const [isListening, setIsListening] = useState(false);

  const glassInput = `w-full rounded-2xl px-5 py-4
backdrop-blur-xl
border
shadow-lg
transition-all
duration-300
${
  darkMode
    ? "bg-white/10 border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400"
    : "bg-white/50 border-white/40 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-400"
}`;

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const startListening = () => {
    if (isListening) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      let voice = event.results[0][0].transcript.toLowerCase().trim();

      // Today
      if (voice.includes("today")) {
        setDueDate(formatDate(new Date()));
        voice = voice.replace("today", "").trim();
      }

      // Tomorrow
      if (voice.includes("tomorrow")) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        setDueDate(formatDate(tomorrow));

        voice = voice.replace("tomorrow", "").trim();
      }

      // Priority
      if (voice.includes("high priority")) {
        setPriority("High");
        voice = voice.replace("high priority", "").trim();
      }

      if (voice.includes("medium priority")) {
        setPriority("Medium");
        voice = voice.replace("medium priority", "").trim();
      }

      if (voice.includes("low priority")) {
        setPriority("Low");
        voice = voice.replace("low priority", "").trim();
      }

      // Category

      if (voice.includes("study")) {
        setCategory("Study");
      }

      if (voice.includes("work")) {
        setCategory("Work");
      }

      if (voice.includes("shopping")) {
        setCategory("Shopping");
      }

      if (voice.includes("health")) {
        setCategory("Health");
      }

      if (voice.includes("personal")) {
        setCategory("Personal");
      }

      setTask(voice);
    };

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.log(event.error);

      setIsListening(false);

      // Ignore aborted error
      if (event.error === "aborted") return;

      alert("Speech Error: " + event.error);
    };
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 p-6 rounded-3xl backdrop-blur-xl bg-white/20 dark:bg-white/5 border border-white/20 shadow-xl mb-8">
      {/* Task Input + Mic */}
      <div className="relative xl:col-span-2">
        <input
          type="text"
          placeholder={isListening ? "🎙 Listening..." : "Enter your task..."}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
          className={`${glassInput} pr-16`}
        />

        <button
          type="button"
          disabled={isListening}
          onClick={startListening}
          className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300
        ${
          isListening
            ? "text-red-500 animate-pulse scale-125 cursor-not-allowed"
            : "text-cyan-600 hover:text-cyan-800 hover:scale-110"
        }`}
        >
          <FaMicrophone size={22} />
        </button>
      </div>

      {/* Priority */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className={glassInput}
      >
        <option value="High">🔴 High</option>
        <option value="Medium">🟡 Medium</option>
        <option value="Low">🟢 Low</option>
      </select>

      {/* Due Date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className={glassInput}
      />

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={glassInput}
      >
        <option value="Study">📚 Study</option>
        <option value="Work">💼 Work</option>
        <option value="Personal">🏠 Personal</option>
        <option value="Shopping">🛒 Shopping</option>
        <option value="Health">💪 Health</option>
      </select>

      {/* Add Button */}
      <button
        onClick={addTodo}
        className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 shadow-xl hover:scale-105 hover:shadow-cyan-500/50 transition-all duration-300"
      >
        ➕ Add Task
      </button>
    </div>
  );
}

export default TodoForm;
