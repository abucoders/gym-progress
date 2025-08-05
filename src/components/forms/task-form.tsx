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
import { useUserState } from "@/stores/user.store";
import { toast } from "sonner";
import FillLoading from "@/components/shared/fill-loading";
import type { ITaskFormProps } from "@/interface";

const TaskForm = ({ title = "", handler, isEdit, onClose }: ITaskFormProps) => {
  // Hooks
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserState();

  // Initialize the form with the task schema for validation
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof taskSchema>) => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    setIsLoading(true);

    const promise = handler(values).finally(() => {
      setIsLoading(false);
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Success!",
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
            {isEdit ? (
              <>
                {/* Close */}
                <Button
                  type="button"
                  variant="secondary"
                  className="h-10 mr-2 cursor-pointer"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Close
                </Button>

                {/* Save */}
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={isLoading}
                  className="h-10 mr-2 cursor-pointer"
                >
                  Save
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                className="h-10 cursor-pointer"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};

export default TaskForm;
