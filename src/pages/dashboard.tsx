import TaskForm from "@/components/forms/task-form";
import TaskItem from "@/components/shared/task-item";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { BadgePlus } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="h-screen max-w-6xl mx-auto flex items-center">
      <div className="grid grid-cols-2 w-full gap-8 items-center">
        <div className="flex flex-col space-y-3">
          <div className="w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary">
            <div className="text-2xl font-bold">Trainigs</div>

            <Dialog>
              <DialogTrigger className="cursor-pointer">
                <Button size={"icon"}>
                  <BadgePlus />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a new task</DialogTitle>
                </DialogHeader>

                <Separator />

                {/* Task form */}
                <TaskForm />
              </DialogContent>
            </Dialog>
          </div>

          <Separator />

          <div className="w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60">
            <div className="w-full flex flex-col space-y-3">
              {Array.from({ length: 3 }).map(() => (
                <TaskItem />
              ))}
            </div>
          </div>
        </div>

        {/* Total week, moth */}
        <div className="flex flex-col space-y-3 relative w-full">
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
  );
};

export default Dashboard;
