function ProgressBar({ completionRate }) {
  return (
    <div className="mb-8 rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-xl">
      <div className="flex justify-between mb-3">
        <h2 className="text-xl font-bold">Overall Progress</h2>

        <span className="font-bold text-blue-600">{completionRate}%</span>
      </div>

      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-700"
          style={{
            width: `${completionRate}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
