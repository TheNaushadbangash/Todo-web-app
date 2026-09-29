import { FaCheckCircle, FaTasks, FaChartLine } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="mb-8 rounded-3xl border border-white/50 bg-white/40 backdrop-blur-2xl shadow-xl px-6 py-4 transition-all duration-500 hover:shadow-2xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
            <FaCheckCircle size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 transition-all duration-300 group-hover:text-blue-600">
              TodoFlow
            </h1>

            <p className="text-xs text-gray-500">
              Stay focused. Get things done.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <button className="group flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-white/70 hover:text-blue-600 transition-all duration-300 hover:-translate-y-1">
            <FaTasks className="transition-transform duration-300 group-hover:scale-110" />
            <span className="hidden sm:block">Tasks</span>
          </button>

          <button className="group flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-white/70 hover:text-purple-600 transition-all duration-300 hover:-translate-y-1">
            <FaChartLine className="transition-transform duration-300 group-hover:scale-110" />
            <span className="hidden sm:block">Productivity</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
