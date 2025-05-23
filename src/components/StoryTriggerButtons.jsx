// components/StoryTriggerButtons.jsx
import React from "react";

function StoryTriggerButtons({ keywords, onTrigger }) {
  return (
    <div className="flex flex-col items-end space-y-2 px-6 py-4">
      {keywords.map((keyword, idx) => (
        <button
          key={idx}
          onClick={() => onTrigger(keyword)}
          className="bg-white text-tropical border border-tropical px-4 py-2 rounded-full shadow hover:bg-tropical hover:text-white transition"
        >
          {keyword}
        </button>
      ))}
    </div>
  );
}

export default StoryTriggerButtons;
