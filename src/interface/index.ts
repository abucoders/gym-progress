import type { taskSchema } from "@/lib/validation";
import type z from "zod";

// Programs
export interface ProgramsItems {
  title: string;
  descr: string;
}

// Navbar Links
export interface NavLinks {
  label: string;
  path: string;
}

// Task Form Props
export interface ITaskFormProps {
  title?: string;
  isEdit?: boolean;
  onClose?: () => void;
  handler: (values: z.infer<typeof taskSchema>) => Promise<void | unknown>;
}

// Task
export interface ITask {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  totalTime: number;
  userId: string;
  status: ITaskStatus;
}

// Task Status
export type ITaskStatus = "unstarted" | "in_progress" | "paused";

// Task Data
export interface ITaskData {
  weekTotal: number;
  mothTotal: number;
  total: number;
  tasks: ITask[];
}
