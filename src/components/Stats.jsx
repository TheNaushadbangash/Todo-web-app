import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Stats({
  totalTasks,
  completedTasks,
  pendingTasks,
  completionRate,
  todos,
  xp,
  badge,
  streak,
}) {
  const pieData = [
    {
      name: "Completed",
      value: completedTasks,
    },
    {
      name: "Pending",
      value: pendingTasks,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  const barData = [
    {
      name: "Tasks",
      Total: totalTasks,
      Completed: completedTasks,
      Pending: pendingTasks,
    },
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weeklyData = weekDays.map((day, index) => ({
    day,
    tasks: todos.filter((todo) => {
      if (!todo.createdAt) return false;

      const date = new Date(todo.createdAt);
      return date.getDay() === index;
    }).length,
  }));
  const level = Math.floor(xp / 100) + 1;
  const currentXP = xp % 100;

  return (
    <div className="mb-10">
      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow-xl">
          <h2 className="text-lg">Total Tasks</h2>

          <h1 className="text-5xl font-bold mt-3">{totalTasks}</h1>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 shadow-xl">
          <h2 className="text-lg">Completed</h2>

          <h1 className="text-5xl font-bold mt-3">{completedTasks}</h1>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-red-500 to-rose-600 text-white p-6 shadow-xl">
          <h2 className="text-lg">Pending</h2>

          <h1 className="text-5xl font-bold mt-3">{pendingTasks}</h1>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-xl">
          <h2 className="text-lg">Progress</h2>

          <h1 className="text-5xl font-bold mt-3">{completionRate}%</h1>
        </div>
      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-5">Completion Chart</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={110} label>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-5">Tasks Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="Completed" fill="#22c55e" />

              <Bar dataKey="Pending" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-600 p-8 text-white shadow-2xl my-8 hover:scale-[1.02] transition-all duration-500">
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-white/10"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-4xl font-extrabold">🏆 Achievement</h2>

            <p className="text-xl mt-3">
              Badge:
              <span className="font-bold ml-2">{badge}</span>
            </p>

            <p className="text-xl mt-2">
              ⭐ XP:
              <span className="font-bold ml-2">{xp}</span>
            </p>

            <p className="text-xl mt-2">
              🚀 Level:
              <span className="font-bold ml-2">{level}</span>
            </p>
          </div>

          <div className="w-full md:w-96">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Level Progress</span>

              <span>{currentXP}/100 XP</span>
            </div>

            <div className="h-5 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-white to-yellow-300 transition-all duration-1000"
                style={{
                  width: `${currentXP}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Analytics */}

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Weekly Analytics</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="tasks" fill="#3b82f6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Stats;
