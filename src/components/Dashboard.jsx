import React from "react";
export default function Dashboard({
  classrooms,
  subjects,
  teachers,
  timetable,
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-100">
        Dashboard
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Classrooms" value={classrooms.length} />
        <Card title="Subjects" value={subjects.length} />
        <Card title="Teachers" value={teachers.length} />
      </div>

      <p className="text-slate-400">
        Total Classes: {timetable.length}
      </p>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded p-4">
      <p className="text-slate-400">{title}</p>
      <p className="text-3xl font-bold text-teal-400">
        {value}
      </p>
    </div>
  );
}
