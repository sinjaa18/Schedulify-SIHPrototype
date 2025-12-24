import React,{ useState, useEffect } from "react";
import { load, save } from "./utils/storage";

import Auth from "./components/Auth";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPanel";
import HODPanel from "./components/HODPanel";
import UserTimetablePanel from "./components/UserTimetablePanel";

export default function App() {
  const [user, setUser] = useState(() => load("currentUser", null));
  const [page, setPage] = useState("dashboard");

  const [classrooms, setClassrooms] = useState(() => load("classrooms", []));
  const [subjects, setSubjects] = useState(() => load("subjects", []));
  const [teachers, setTeachers] = useState(() => load("teachers", []));
  const [timetable, setTimetable] = useState(() => load("timetable", []));
  const [approved, setApproved] = useState(() => load("approved", false));

  useEffect(() => save("currentUser", user), [user]);
  useEffect(() => save("classrooms", classrooms), [classrooms]);
  useEffect(() => save("subjects", subjects), [subjects]);
  useEffect(() => save("teachers", teachers), [teachers]);
  useEffect(() => save("timetable", timetable), [timetable]);
  useEffect(() => save("approved", approved), [approved]);

  if (!user) return <Auth onLogin={setUser} />;

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <Sidebar user={user} setUser={setUser} setPage={setPage} />

      <main className="flex-1 p-6">
        {page === "dashboard" && (
          <Dashboard
            classrooms={classrooms}
            subjects={subjects}
            teachers={teachers}
            timetable={timetable}
          />
        )}

        {page === "admin" && (
          <AdminPanel
            classrooms={classrooms}
            setClassrooms={setClassrooms}
            subjects={subjects}
            setSubjects={setSubjects}
            teachers={teachers}
            setTeachers={setTeachers}
            setTimetable={setTimetable}
            setApproved={setApproved}
          />
        )}

        {page === "hod" && (
          <HODPanel
            timetable={timetable}
            approved={approved}
            setApproved={setApproved}
          />
        )}

        {page === "timetable" && (
          <UserTimetablePanel
            role={user.role}
            name={user.name}
            timetable={timetable}
            approved={approved}
          />
        )}
      </main>
    </div>
  );
}
