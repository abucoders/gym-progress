import { taskSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { useUserState } from "@/stores/user.store";
import { toast } from "sonner";
import FillLoading from "@/components/shared/fill-loading";

const TaskForm = () => {
  // Hooks
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserState();

  // Initialize the form with the task schema for validation
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "" },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof taskSchema>) => {
    const { title } = values;

    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    setIsLoading(true);

    const promise = addDoc(collection(db, "tasks"), {
      title,
      status: "unstarted",
      startTime: null,
      endTime: null,
      userId: user?.uid,
    }).finally(() => {
      setIsLoading(false);
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Successfully!",
      error: "Something went wrong!",
    });
  };

  return (
    <>
      {isLoading && <FillLoading />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter a task"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="h-10 cursor-pointer"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default TaskForm;
