import type { NavLinks, ProgramsItems } from "@/interface";
import {
  DiApple,
  DiGithubAlt,
  DiModernizr,
  DiNpm,
  DiProlog,
  DiVisualstudio,
  DiWordpress,
} from "react-icons/di";

// Navbar links
export const navLinks: NavLinks[] = [
  { label: "Home", path: "#home" },
  { label: "Programs", path: "#programs" },
];

// Featured Items
export const featuredItems = [
  DiApple,
  DiGithubAlt,
  DiProlog,
  DiVisualstudio,
  DiWordpress,
  DiModernizr,
  DiNpm,
];

// Programs Items
export const programs: ProgramsItems[] = [
  {
    title: "Workout Videos",
    descr: "Access to hundreds of freee, full-length workout videos.",
  },
  {
    title: "Workout Program",
    descr: "Afoordable and effective workout programs.",
  },
  {
    title: "Meal Plans",
    descr: "Plans built with registered dietitans and nutritionists.",
  },
];
