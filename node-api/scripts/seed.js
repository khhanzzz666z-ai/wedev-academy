const {
  sequelize,
  User,
  Course,
  Lesson,
  Enrollment,
} = require("../src/models");
const bcrypt = require("bcrypt");

async function seed() {
  await sequelize.sync({ alter: true });
  console.log("DB synced");

  const passwordHash = await bcrypt.hash("password123", 12);
  const [user] = await User.findOrCreate({
    where: { email: "student@example.com" },
    defaults: { fullname: "Student Demo", password: passwordHash },
  });

  const [course] = await Course.findOrCreate({
    where: { title: "HTML & CSS Basics" },
    defaults: { description: "Intro course for HTML & CSS" },
  });

  const lessonsData = [
    { title: "Pengenalan HTML", content: "Belajar dasar HTML", duration: 10 },
    {
      title: "Struktur Dasar",
      content: "HTML structure and tags",
      duration: 12,
    },
    { title: "Tag Penting", content: "Common HTML tags", duration: 8 },
  ];

  for (const l of lessonsData) {
    await Lesson.findOrCreate({
      where: { courseId: course.id, title: l.title },
      defaults: {
        courseId: course.id,
        content: l.content,
        duration: l.duration,
      },
    });
  }

  await Enrollment.findOrCreate({
    where: { userId: user.id, courseId: course.id },
    defaults: { userId: user.id, courseId: course.id },
  });

  console.log("Seeding complete. User:", user.email);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
