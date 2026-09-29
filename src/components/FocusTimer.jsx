import { useEffect, useState } from "react";

import { Play, Pause, RotateCcw, X, Timer, CheckCircle2 } from "lucide-react";

function FocusTimer({ todo, onClose, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const TOTAL_TIME = 25 * 60;

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

  const progress = ((TOTAL_TIME - timeLeft) / TOTAL_TIME) * 100;

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TOTAL_TIME);
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60
        backdrop-blur-md
        p-4
        animate-[fadeIn_.3s_ease-out]
      "
    >
      <div
        className="
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-[35px]
          bg-white/90
          backdrop-blur-3xl
          border border-white/60
          shadow-[0_30px_100px_rgba(0,0,0,0.3)]
          p-8
          text-center
          animate-[scaleIn_.35s_ease-out]
        "
      >
        {/* Background Glow */}

        <div
          className="
            absolute
            -top-24
            -left-24
            w-64
            h-64
            rounded-full
            bg-purple-400/20
            blur-3xl
            animate-pulse
          "
        />

        <div
          className="
            absolute
            -bottom-24
            -right-24
            w-64
            h-64
            rounded-full
            bg-cyan-400/20
            blur-3xl
            animate-pulse
          "
        />

        {/* Close */}

        <button
          onClick={onClose}
          className="
            absolute
            top-5
            right-5
            z-10
            w-10
            h-10
            rounded-full
            bg-gray-100
            text-gray-500
            flex
            items-center
            justify-center
            transition-all
            duration-300
            hover:bg-red-500
            hover:text-white
            hover:rotate-90
            hover:scale-110
            hover:-translate-y-1
            hover:shadow-xl
            active:scale-95
          "
        >
          <X size={20} />
        </button>

        {/* Header */}

        <div className="relative">
          <div
            className="
              mx-auto
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-br
              from-purple-500
              to-blue-600
              text-white
              flex
              items-center
              justify-center
              shadow-lg
              transition-all
              duration-500
              hover:scale-110
              hover:rotate-6
            "
          >
            <Timer size={30} />
          </div>

          <h2 className="mt-5 text-3xl font-extrabold text-gray-900">
            Focus Mode
          </h2>

          <p className="mt-2 text-gray-500 text-sm">
            Stay focused and finish your task.
          </p>
        </div>

        {/* Task */}

        <div
          className="
            relative
            mt-6
            rounded-2xl
            bg-gradient-to-r
            from-purple-50
            to-blue-50
            border border-purple-100
            p-4
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Current Task
          </p>

          <h3 className="mt-1 text-lg font-bold text-gray-800">{todo.text}</h3>
        </div>

        {/* Circular Timer */}

        <div className="relative flex justify-center my-8">
          <div className="relative w-64 h-64">
            {/* SVG Progress Ring */}

            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              {/* Background Ring */}

              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-gray-200"
              />

              {/* Progress Ring */}

              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#timerGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={
                  2 * Math.PI * 52 - (2 * Math.PI * 52 * progress) / 100
                }
                className="transition-all duration-1000"
              />

              {/* Gradient */}

              <defs>
                <linearGradient
                  id="timerGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Timer Content */}

            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
              "
            >
              <div>
                <div
                  className="
                    text-5xl
                    font-black
                    tracking-tight
                    bg-gradient-to-r
                    from-purple-600
                    to-blue-600
                    bg-clip-text
                    text-transparent
                  "
                >
                  {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </div>

                <p className="mt-2 text-xs font-semibold text-gray-400">
                  {isRunning ? "FOCUSING..." : "READY"}
                </p>

                <p className="mt-1 text-xs font-bold text-purple-500">
                  {Math.round(progress)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}

        <div className="relative mb-7">
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-purple-500
                to-cyan-500
                transition-all
                duration-1000
              "
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>0%</span>

            <span>{Math.round(progress)}%</span>

            <span>100%</span>
          </div>
        </div>

        {/* Controls */}

        <div className="relative flex justify-center gap-3">
          {/* Start / Pause */}

          <button
            onClick={() => setIsRunning((prev) => !prev)}
            className="
              flex
              items-center
              gap-2
              px-7
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-purple-500
              to-blue-600
              text-white
              font-bold
              shadow-xl
              transition-all
              duration-300
              hover:scale-105
              hover:-translate-y-1
              hover:shadow-2xl
              hover:shadow-purple-500/40
              active:scale-95
            "
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}

            {isRunning ? "Pause" : "Start Focus"}
          </button>

          {/* Reset */}

          <button
            onClick={resetTimer}
            className="
              w-14
              h-14
              rounded-2xl
              bg-gray-100
              text-gray-600
              flex
              items-center
              justify-center
              shadow-lg
              transition-all
              duration-300
              hover:scale-110
              hover:-translate-y-1
              hover:rotate-12
              hover:bg-gray-200
              hover:shadow-xl
              active:scale-95
            "
            title="Reset Timer"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Bottom Message */}

        <div className="relative mt-7 flex items-center justify-center gap-2 text-sm text-gray-400">
          <CheckCircle2 size={16} />

          <span>Complete your focus session to finish the task.</span>
        </div>
      </div>
    </div>
  );
}

export default FocusTimer;
