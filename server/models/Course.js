import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String,
  duration: Number,
  videoUrl: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    level: String,
    hours: Number,
    desc: String,
    image: String,
    instructor: String,
    rating: Number,
    students: Number,
    lessons: [lessonSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
