
import TimetableView from "./TimetableView";
import React from "react";
export default function HODPanel({
  timetable,
  approved,
  setApproved,
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">HOD Panel</h2>

      {timetable.length === 0 ? (
        <p>No timetable generated.</p>
      ) : (
        <>
          {!approved ? (
            <div className="flex gap-2">
              <button
                onClick={() => setApproved(true)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => setApproved(false)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          ) : (
            <p className="text-green-600 font-semibold">
              Approved
            </p>
          )}

          <TimetableView timetable={timetable} />
        </>
      )}
    </div>
  );
}
