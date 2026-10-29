
import useStore from "./useStore";

function Theme() {
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);

  const isDark = theme === "Dark";

  return (
    <div
      className={`rounded-lg p-6 transition-colors duration-300 ${
        isDark
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <h2 className="mb-3 text-xl font-semibold">Theme</h2>

      <p className="mb-4">
        Current theme: {theme}
      </p>

      <button
        onClick={toggleTheme}
        className={`rounded px-4 py-2 font-medium ${
          isDark
            ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default Theme;
