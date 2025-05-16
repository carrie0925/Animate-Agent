// src/components/ProgressBar.jsx
function ProgressBar({ step, total }) {
  const percent = (step / total) * 100;

  return (
    <div className="w-full bg-gray-200 h-2 rounded fixed bottom-0 left-0 z-10">
      <div
        className="h-2 bg-indigo-600 rounded transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default ProgressBar;
