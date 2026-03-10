const STATUS_ORDER = ["Submitted", "In Review", "Assigned", "In Progress", "Resolved"];

const DOT_COLORS = {
  Submitted:    "bg-gray-400",
  "In Review":  "bg-yellow-400",
  Assigned:     "bg-blue-500",
  "In Progress":"bg-orange-500",
  Resolved:     "bg-green-500",
  Rejected:     "bg-red-500",
};

export default function StatusTimeline({ history = [] }) {
  return (
    <div className="relative">
      {history.map((item, idx) => {
        const isLast = idx === history.length - 1;
        const dot = DOT_COLORS[item.status] || "bg-gray-400";
        const date = new Date(item.timestamp).toLocaleString("en-IN", {
          day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
        });

        return (
          <div key={idx} className="flex gap-4">
            {/* Dot + line */}
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${dot}`} />
              {!isLast && <div className="w-0.5 bg-gray-200 flex-1 my-1" />}
            </div>

            {/* Content */}
            <div className={`pb-5 ${isLast ? "" : ""}`}>
              <p className="font-semibold text-gray-800 text-sm">{item.status}</p>
              {item.note && <p className="text-sm text-gray-500 mt-0.5">{item.note}</p>}
              <p className="text-xs text-gray-400 mt-1">{date}</p>
              {item.updatedBy?.name && (
                <p className="text-xs text-blue-500">by {item.updatedBy.name}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
