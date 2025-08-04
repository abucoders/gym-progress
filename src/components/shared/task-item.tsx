import { Card } from "@/components/ui/card";
import { MdTaskAlt } from "react-icons/md";
import { HiStatusOnline } from "react-icons/hi";
import { CiPlay1 } from "react-icons/ci";
import { Button } from "../ui/button";
import { Edit2, Trash } from "lucide-react";

const TaskItem = () => {
  return (
    <Card className="w-full p-4 shadow-md grid grid-cols-4 items-center relative">
      <div className="flex gap-1 items-center col-span-2 ">
        <MdTaskAlt className="text-green-500" />
        <div className="text-sm font-semibold capitalize">task tame</div>
      </div>

      <div className="flex gap-1 items-center">
        <HiStatusOnline />
        <span className="capitalize text-sm">Unstarted</span>
      </div>

      <div className="flex gap-1 items-center justify-self-end">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="size-8 cursor-pointer"
        >
          <CiPlay1 className="size-4" />
        </Button>
        <Button
          variant={"secondary"}
          size={"icon"}
          className="size-8 cursor-pointer"
        >
          <Edit2 className="size-4" />
        </Button>
        <Button
          variant={"destructive"}
          size={"icon"}
          className="size-8 cursor-pointer"
        >
          <Trash className="size-4" />
        </Button>
      </div>
    </Card>
  );
};

export default TaskItem;
