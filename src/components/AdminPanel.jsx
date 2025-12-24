import React,{ useState } from "react";
import { generateTimetable } from "../utils/scheduler";

export default function AdminPanel({
  classrooms,
  setClassrooms,
  subjects,
  setSubjects,
  teachers,
  setTeachers,
  setTimetable,
  setApproved,
}) {
  const [room, setRoom] = useState("");
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState({
    name: "",
    minPerWeek: 1,
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Admin Panel</h2>

      <Block title="Add Classroom">
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="input text-gray-900  "
        />
        <button
          onClick={() => {
            setClassrooms([...classrooms, room]);
            setRoom("");
          }}
          className="btn"
        >
          Add
        </button>
      </Block>

      <Block title="Add Teacher">
        <input
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          className="input"
        />
        <button
          onClick={() => {
            setTeachers([...teachers, teacher]);
            setTeacher("");
          }}
          className="btn"
        >
          Add
        </button>
      </Block>

      <Block title="Add Subject">
        <input
          placeholder="Subject name"
          value={subject.name}
          onChange={(e) =>
            setSubject({ ...subject, name: e.target.value })
          }
          className="input"
        />
        <input
          type="number"
          min="1"
          placeholder="Min per week"
          value={subject.minPerWeek}
          onChange={(e) =>
            setSubject({
              ...subject,
              minPerWeek: Number(e.target.value),
            })
          }
          className="input"
        />
        <button
          onClick={() => {
            setSubjects([...subjects, subject]);
            setSubject({ name: "", minPerWeek: 1 });
          }}
          className="btn"
        >
          Add
        </button>
      </Block>

      <button
        onClick={() => {
          setTimetable(
            generateTimetable({
              subjects,
              teachers,
              classrooms,
            })
          );
          setApproved(false);
        }}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Generate Timetable
      </button>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="bg-slate-800 border border-slate-700 p-4 rounded space-y-2">
      <h3 className="font-semibold">{title}</h3>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}
