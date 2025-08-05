import { db } from "@/firebase";
import type { ITask, ITaskData } from "@/interface";
import { collection, getDocs } from "firebase/firestore";

export const TaskService = {
  getTasks: async () => {
    const weekTotal = 0;
    const mothTotal = 0;
    const total = 0;

    const q = collection(db, "tasks");
    const querySnapshot = await getDocs(q);

    let taskData: ITaskData;

    const tasks = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    })) as ITask[];

    // eslint-disable-next-line prefer-const
    taskData = {
      tasks,
      weekTotal,
      mothTotal,
      total,
    };

    return taskData;
  },
};
