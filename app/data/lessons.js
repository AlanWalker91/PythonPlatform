import { stage1Lessons, stage1Templates } from "./lessons/stage1-foundations.js";
import { stage2Lessons, stage2Templates } from "./lessons/stage2-patterns.js";
import { stage3Lessons, stage3Templates } from "./lessons/stage3-structures.js";
import { stage4Lessons, stage4Templates } from "./lessons/stage4-design.js";
import { stage5Lessons, stage5Templates } from "./lessons/stage5-advanced.js";

const lessons = [
  ...stage1Lessons,
  ...stage2Lessons,
  ...stage3Lessons,
  ...stage4Lessons,
  ...stage5Lessons
];

const lessonTemplates = {
  ...stage1Templates,
  ...stage2Templates,
  ...stage3Templates,
  ...stage4Templates,
  ...stage5Templates
};

export { lessons, lessonTemplates };
