import TaskForm from "@/components/forms/task-form";
import FillLoading from "@/components/shared/fill-loading";
import TaskItem from "@/components/shared/task-item";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { db } from "@/firebase";
import type { ITask } from "@/interface";
import type { taskSchema } from "@/lib/validation";
import { TaskService } from "@/service/task.service";
import { useUserState } from "@/stores/user.store";
import { useQuery } from "@tanstack/react-query";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { BadgePlus, Terminal } from "lucide-react";
import { useState } from "react";
import type z from "zod";

const Dashboard = () => {
  // Hooks
  const { user } = useUserState();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["tasks-data"],
    queryFn: TaskService.getTasks,
  });

  // Function to handle adding a new task
  const onAdd = async (values: z.infer<typeof taskSchema>) => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    return addDoc(collection(db, "tasks"), {
      title: values.title,
      status: "unstarted",
      startTime: null,
      endTime: null,
      userId: user.uid,
    })
      .then(() => refetch())
      .finally(() => setOpen(false));
  };

  // Function to handle editing a task
  const onStartEditing = (task: ITask) => {
    setIsEditing(true);
    setCurrentTask(task);
  };

  // Function to handle updating a task
  const onUpdate = async (values: z.infer<typeof taskSchema>) => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    if (!currentTask) {
      console.error("No task is currently being edited");
      return;
    }

    const ref = doc(db, "tasks", currentTask.id);
    return updateDoc(ref, { title: values.title })
      .then(() => refetch())
      .finally(() => setIsEditing(false));
  };

  return (
    <>
      <div className="h-screen max-w-6xl mx-auto flex items-center">
        <div className="grid grid-cols-2 w-full gap-8 items-center">
          <div className="flex flex-col space-y-3">
            <div className="w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary">
              <div className="text-2xl font-bold">Trainigs</div>
              <Button size={"icon"} onClick={() => setOpen(true)}>
                <BadgePlus />
              </Button>
            </div>

            <Separator />

            <div className="w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60">
              <div className="w-full flex flex-col space-y-3">
                {isPending && <FillLoading />}
                {error && (
                  <Alert variant="destructive">
                    <Terminal />
                    <AlertDescription>{error.message}</AlertDescription>
                  </Alert>
                )}

                {!isEditing &&
                  data?.tasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onStartEditing={() => onStartEditing(task)}
                    />
                  ))}

                {isEditing && (
                  <TaskForm
                    title={currentTask?.title}
                    isEdit
                    onClose={() => setIsEditing(false)}
                    handler={onUpdate}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Total week, moth */}
          <div className="flex flex-col space-y-3 w-full">
            <div className="p-4 rounded-md bg-gradient-to-r bg-blue-900 to-secondary relative h-24">
              <div className="text-2xl font-bold capitalize">Total week</div>
              <div className="text-3xl font-bold">02:08:47</div>
            </div>
            <div className="p-4 rounded-md bg-gradient-to-r from-secondary to-secondary relative h-24">
              <div className="text-2xl font-bold capitalize">Total month</div>
              <div className="text-3xl font-bold">02:08:47</div>
            </div>
            <div className="p-4 rounded-md bg-gradient-to-r from-destructive to-secondary relative h-24">
              <div className="text-2xl font-bold capitalize">Total</div>
              <div className="text-3xl font-bold">02:08:47</div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="cursor-pointer"></DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new task</DialogTitle>
          </DialogHeader>

          <Separator />

          {/* Task form */}
          <TaskForm handler={onAdd} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;
