export function generateTimetable({
  subjects,
  teachers,
  classrooms,
}) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = ["9-10", "10-11", "11-12", "2-3", "3-4"];

  const timetable = [];
  const usage = {};

  subjects.forEach((s) => {
    usage[s.name] = {
      weekly: 0,
      daily: {},
      teacherDaily: {},
    };
  });

  for (const day of days) {
    for (const slot of slots) {
      for (const subject of subjects) {
        const u = usage[subject.name];

        if (u.weekly >= subject.minPerWeek) continue;
        if (u.daily[day]) continue;

        const teacher = teachers.find(
          (t) => !u.teacherDaily[`${t}-${day}`]
        );
        if (!teacher) continue;

        const room =
          classrooms[timetable.length % classrooms.length];

        timetable.push({
          day,
          slot,
          subject: subject.name,
          teacher,
          room,
        });

        u.weekly++;
        u.daily[day] = true;
        u.teacherDaily[`${teacher}-${day}`] = true;

        break;
      }
    }
  }

  return timetable;
}
