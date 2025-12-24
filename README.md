import TimetableView from "./TimetableView";

export default function UserTimetablePanel({
  role,
  name,
  timetable,
  approved,
}) {
  if (!approved) {
    return (
      <p className="text-slate-400">
        Timetable not approved yet.
      </p>
    );
  }

  const normalize = (v) =>
    String(v || "").toLowerCase().trim();

  const filtered =
    role === "Teacher"
      ? timetable.filter(
          (t) => normalize(t.teacher) === normalize(name)
        )
      : timetable;

  if (filtered.length === 0) {
    return (
      <p className="text-slate-400">
        No classes assigned.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        {role} Timetable
      </h2>
      <TimetableView timetable={filtered} />
    </div>
  );
}
