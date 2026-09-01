import { useEffect, useState } from "react";

function FocusTimer({ todo, onClose, onComplete }) {
  const [duration, setDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);

          onComplete(todo.id);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onComplete, todo.id]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const changeDuration = (minutes) => {
    if (isRunning) return;

    setDuration(minutes);
    setTimeLeft(minutes * 60);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="w-full max-w-md rounded-[35px] bg-white dark:bg-gray-900 p-8 shadow-2xl text-center">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">🎯 Focus Mode</h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          >
            ✕
          </button>
        </div>

        {/* Task */}
        <h3 className="text-xl font-semibold mb-6">{todo?.text}</h3>

        {/* Duration Buttons */}
        <div className="flex justify-center gap-3 mb-8">
          {[5, 25, 50].map((minutes) => (
            <button
              key={minutes}
              onClick={() => changeDuration(minutes)}
              className={`px-5 py-2 rounded-xl font-bold transition ${
                duration === minutes
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {minutes} min
            </button>
          ))}
        </div>

        {/* Timer */}
        <div className="w-64 h-64 mx-auto rounded-full border-8 border-cyan-500 flex items-center justify-center shadow-xl mb-8">
          <div>
            <p className="text-5xl font-bold">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </p>

            <p className="text-gray-500 mt-2">
              {isRunning ? "🔥 Focusing..." : "Focus Time"}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsRunning((prev) => !prev)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg hover:scale-105 transition"
          >
            {isRunning ? "⏸ Pause" : "▶ Start"}
          </button>

          <button
            onClick={resetTimer}
            className="px-6 py-3 rounded-2xl bg-gray-200 dark:bg-gray-700 font-bold hover:scale-105 transition"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default FocusTimer;
