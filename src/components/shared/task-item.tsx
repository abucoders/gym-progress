import { Card } from "@/components/ui/card";
import { MdTaskAlt } from "react-icons/md";
import { HiStatusOnline } from "react-icons/hi";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { Button } from "../ui/button";
import { Edit2, Trash } from "lucide-react";
import type { ITask, ITaskData } from "@/interface";
import { RxReload } from "react-icons/rx";
import { useState } from "react";
import { toast } from "sonner";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import FillLoading from "./fill-loading";
import type { QueryObserverResult } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

interface Props {
  task: ITask;
  onStartEditing: () => void;
  onDelete: () => void;
  refetch: () => Promise<QueryObserverResult<ITaskData, Error>>;
}

const TaskItem = ({ task, onStartEditing, onDelete, refetch }: Props) => {
  // Hooks
  const [isLoading, setIsLoading] = useState(false);

  // Handlers
  const onStart = async () => {
    setIsLoading(true);
    const ref = doc(db, "tasks", task.id);

    try {
      await updateDoc(ref, { status: "in_progress", startTime: Date.now() });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to update task status");
    } finally {
      refetch();
      setIsLoading(false);
    }
  };

  // Pause Handler
  const onPause = async () => {
    setIsLoading(true);
    const ref = doc(db, "tasks", task.id);

    try {
      const elapsedTime = task.startTime ? Date.now() - task.startTime : 0;
      const newTotalTime = (task.totalTime || 0) + elapsedTime;
      await updateDoc(ref, {
        status: "paused",
        endTime: Date.now(),
        totalTime: newTotalTime,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to update task status");
    } finally {
      refetch();
      setIsLoading(false);
    }
  };

  // Render Status Function
  const renderStatus = () => {
    switch (task.status) {
      case "unstarted":
        return (
          <Button
            variant={"ghost"}
            size={"icon"}
            className="size-8 cursor-pointer"
            onClick={onStart}
          >
            <CiPlay1 className="size-4" />
          </Button>
        );
      case "in_progress":
        return (
          <Button
            variant={"ghost"}
            size={"icon"}
            className="size-8 cursor-pointer"
            onClick={onPause}
          >
            <CiPause1 className="size-4" />
          </Button>
        );
      case "paused":
        return (
          <Button
            variant={"ghost"}
            size={"icon"}
            className="size-8 cursor-pointer"
            onClick={onStart}
          >
            <RxReload className="size-4" />
          </Button>
        );
    }
  };
  return (
    <Card className="w-full p-4 shadow-md grid grid-cols-4 items-center relative">
      {/* Loading */}
      {isLoading && <FillLoading />}

      <div className="flex gap-1 items-center col-span-2 ">
        <MdTaskAlt className="text-green-500" />
        <div className="text-sm font-semibold capitalize">{task.title}</div>
      </div>

      <div className="flex gap-1 items-center">
        <HiStatusOnline
          className={cn(
            task.status === "in_progress" && "text-green-600",
            task.status === "paused" && "text-red-600"
          )}
        />
        <span className="capitalize text-sm">{task.status}</span>
      </div>

      <div className="flex gap-1 items-center justify-self-end">
        {/* Render Status */}
        {renderStatus()}

        <Button
          variant={"secondary"}
          size={"icon"}
          className="size-8 cursor-pointer"
          onClick={onStartEditing}
        >
          <Edit2 className="size-4" />
        </Button>
        <Button
          variant={"destructive"}
          size={"icon"}
          className="size-8 cursor-pointer"
          onClick={onDelete}
        >
          <Trash className="size-4" />
        </Button>
      </div>
    </Card>
  );
};

export default TaskItem;
