const COLORS = {
  Submitted:   "bg-gray-100 text-gray-700",
  "In Review": "bg-yellow-100 text-yellow-700",
  Assigned:    "bg-blue-100 text-blue-700",
  "In Progress":"bg-orange-100 text-orange-700",
  Resolved:    "bg-green-100 text-green-700",
  Rejected:    "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${COLORS[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}
