import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge.jsx";

const CATEGORY_ICONS = {
  Garbage: "🗑️",
  Pothole: "🚧",
  Streetlight: "💡",
  "Water Leakage": "💧",
  Other: "📋",
};

export default function ComplaintCard({ complaint }) {
  const icon = CATEGORY_ICONS[complaint.category] || "📋";
  const date = new Date(complaint.createdAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <Link to={`/complaints/${complaint._id}`}>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:border-blue-200 transition cursor-pointer">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-800 truncate">{complaint.title}</h3>
              <StatusBadge status={complaint.status} />
            </div>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{complaint.description}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
              <span>📍 {complaint.location?.address || `${complaint.location?.lat}, ${complaint.location?.lng}`}</span>
              <span>•</span>
              <span>{date}</span>
              <span>•</span>
              <span className="text-blue-600 font-medium">{complaint.assignedDepartment}</span>
            </div>
            {complaint.aiConfidenceScore > 0 && (
              <p className="text-xs text-purple-600 mt-1">
                🤖 AI confidence: {Math.round(complaint.aiConfidenceScore * 100)}%
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
