import React,{ useState } from "react";
import { load, save } from "../utils/storage";

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("Student");
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  const users = load("users", []);

  const submit = () => {
    if (mode === "signup") {
      if (!form.name || !form.username || !form.password) return;
      if (users.some((u) => u.username === form.username)) return;
      save("users", [...users, { ...form, role }]);
      setMode("login");
      return;
    }

    const user = users.find(
      (u) =>
        u.username === form.username &&
        u.password === form.password &&
        u.role === role
    );
    if (!user) return;
    save("currentUser", user);
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl w-80 space-y-4 shadow-xl">
        <h2 className="text-2xl font-bold text-center text-slate-100">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>

        <div className="grid grid-cols-2 gap-2">
          {["Admin", "HOD", "Teacher", "Student"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`p-2 border rounded text-sm transition
                ${
                  role === r
                    ? "bg-teal-600 border-teal-500 text-white"
                    : "bg-slate-700 border-slate-600 text-slate-300"
                }`}
            >
              {r}
            </button>
          ))}
        </div>

        {mode === "signup" && (
          <input
            placeholder="Name"
            className="bg-slate-700 border border-slate-600 p-2 w-full rounded text-slate-100"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        )}

        <input
          placeholder="Username"
          className="bg-slate-700 border border-slate-600 p-2 w-full rounded text-slate-100"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-slate-700 border border-slate-600 p-2 w-full rounded text-slate-100"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={submit}
          className="bg-teal-600 hover:bg-teal-700 transition text-white w-full py-2 rounded"
        >
          {mode === "login" ? "Login" : "Register"}
        </button>

        <p
          className="text-center text-sm cursor-pointer text-teal-400"
          onClick={() =>
            setMode(mode === "login" ? "signup" : "login")
          }
        >
          {mode === "login"
            ? "Create account"
            : "Login instead"}
        </p>
      </div>
    </div>
  );
}
