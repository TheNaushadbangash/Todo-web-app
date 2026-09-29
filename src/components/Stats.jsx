import { CheckCircle2, Clock3, ListTodo, TrendingUp } from "lucide-react";

function Stats({ todos }) {
  const totalTasks = todos.length;

  const completedTasks = todos.filter((todo) => todo.completed).length;

  const pendingTasks = totalTasks - completedTasks;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: ListTodo,
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-500",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-green-500",
      iconBg: "bg-emerald-500",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: Clock3,
      gradient: "from-orange-500 to-yellow-500",
      iconBg: "bg-orange-500",
    },
    {
      title: "Progress",
      value: `${completionRate}%`,
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              bg-white/50
              backdrop-blur-2xl
              border
              border-white/50
              p-6
              shadow-xl
              transition-all
              duration-500
              hover:-translate-y-2
              hover:scale-[1.02]
              hover:shadow-2xl
            "
            style={{
              animation: `fadeUp 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            {/* Glow */}
            <div
              className={`
                absolute
                -right-10
                -top-10
                w-32
                h-32
                rounded-full
                bg-gradient-to-br
                ${stat.gradient}
                opacity-20
                blur-2xl
                transition-all
                duration-500
                group-hover:scale-150
              `}
            />

            {/* Icon */}
            <div
              className={`
                relative
                w-14
                h-14
                rounded-2xl
                ${stat.iconBg}
                text-white
                flex
                items-center
                justify-center
                shadow-lg
                transition-all
                duration-500
                group-hover:scale-110
                group-hover:rotate-6
              `}
            >
              <Icon size={27} />
            </div>

            {/* Text */}
            <div className="relative mt-5">
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>

              <h2
                className={`
                  mt-1
                  text-4xl
                  font-extrabold
                  bg-gradient-to-r
                  ${stat.gradient}
                  bg-clip-text
                  text-transparent
                  transition-all
                  duration-300
                  group-hover:scale-105
                  origin-left
                `}
              >
                {stat.value}
              </h2>
            </div>

            {/* Bottom line */}
            <div
              className={`
                absolute
                bottom-0
                left-0
                h-1
                w-0
                bg-gradient-to-r
                ${stat.gradient}
                transition-all
                duration-500
                group-hover:w-full
              `}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Stats;
