"use client";

import Editor from "@/components/blocks/mdx-editor";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { apis, pages } from "@/config/routes";
import fetcher from "@/lib/fetcher";
import { Policy } from "@/lib/type";
import { Bot, SaveAll, UndoDot } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const PolicyEdit = ({ data }: { data: Policy }) => {
  const router = useRouter();
  const [values, setValues] = useState(data);
  const [isPending, startTransition] = useTransition();

  const handleSave = async () => {
    try {
      const result = await fetcher.put<{ success: boolean; error: string }>(
        apis.policies.edit(data.id),
        values
      );
      if (result.error) {
        toast.error(result.error);
        return console.error(result.error);
      }
      if (result.success) {
        toast.success("Policy updated successfully.");
        startTransition(() => {
          router.replace(pages.dashboard.view(data.id));
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAIEdit = async () => {
    return toast.success("Coming soon.  💥");
    // try {
    //   const result = await fetcher.put<{ success: boolean; error: string }>(
    //     apis.policies.ai_edit(data.id),
    //     { prompt, ...values }
    //   );
    //   if (result.error) {
    //     toast.error(result.error);
    //     return console.error(result.error);
    //   }
    //   if (result.success) {
    //     toast.success("Policy updated successfully.");
    //     startTransition(() => {
    //       router.replace(pages.dashboard.view(data.id));
    //     });
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h2 className="text-2xl font-bold my-2 mb-6 text-gray-900 dark:text-gray-100">
        Edit your {data.policy_type} policy
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <div className="my-t mb-2">Effective Date</div>
          <DateTimePicker
            className="bg-transparent h-10"
            value={
              typeof values.effect_date === "string"
                ? new Date(values.effect_date)
                : values.effect_date instanceof Date
                ? values.effect_date
                : undefined
            }
            onChange={(date) => {
              setValues({ ...values, effect_date: date });
            }}
            granularity="day"
          />
        </div>

        <div>
          <div className="my-t mb-2">Last Update Date</div>
          <DateTimePicker
            className="bg-transparent h-10"
            value={
              values.updated_at
                ? typeof values.updated_at === "string"
                  ? new Date(values.updated_at)
                  : values.updated_at instanceof Date
                  ? values.updated_at
                  : undefined
                : values.created_at
                ? typeof values.created_at === "string"
                  ? new Date(values.created_at)
                  : values.created_at instanceof Date
                  ? values.created_at
                  : undefined
                : undefined
            }
            onChange={(date) => {
              setValues({ ...values, effect_date: date });
            }}
            granularity="day"
          />
        </div>
      </div>

      <Editor
        defaultValue={data.markdown}
        handleSave={(markdown) => setValues({ ...values, markdown })}
      />

      <div className="flex justify-between w-full items-center">
        <Button
          variant={"default"}
          onClick={handleAIEdit}
          className="btn btn-gradient"
        >
          <Bot className="mr-2 h-4 w-4" />
          Edit with AI
        </Button>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={() => router.back()} variant="outline">
            <UndoDot className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={() => startTransition(handleSave)}
            disabled={isPending}
            variant="gradient"
          >
            {isPending ? (
              <span className="mr-2 h-4 w-4 border border-gray-200 rounded-full border-t-0 border-l-0 animate-spin" />
            ) : (
              <SaveAll className="mr-2 h-4 w-4" />
            )}
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};
