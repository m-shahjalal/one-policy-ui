"use client";

import { Loader } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Task } from "../table";

interface UpdateTaskSheetProps<TTask extends Task>
  extends React.ComponentPropsWithRef<typeof Sheet> {
  task: TTask | null;
  onSubmit: (task: TTask) => Promise<{ error: string | null }>;
  FormComponent: React.ComponentType<{
    task: TTask | null;
    onSubmit: (data: any) => void;
    isPending: boolean;
  }>;
}

export function UpdateTaskSheet<TTask extends Task>({
  task,
  onSubmit,
  FormComponent,
  ...props
}: UpdateTaskSheetProps<TTask>) {
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = async (data: any) => {
    startTransition(async () => {
      if (!task && !data.id) return;

      const { error } = await onSubmit(data as TTask);

      if (error) {
        toast.error(error);
        return;
      }

      props.onOpenChange?.(false);
      toast.success("Task updated");
    });
  };

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update task</SheetTitle>
          <SheetDescription>
            Update the task details and save the changes
          </SheetDescription>
        </SheetHeader>
        <FormComponent
          task={task}
          onSubmit={handleSubmit}
          isPending={isPending}
        />
        <SheetFooter className="gap-2 pt-2 sm:space-x-0">
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </SheetClose>
          <Button
            type="submit"
            form="update-task-form" // Make sure your form has this id
            disabled={isPending}
          >
            {isPending && (
              <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
            )}
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
