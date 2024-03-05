"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { LogsForm } from "../types/form";
import { Button } from "flowbite-react";

export default function Form({
  updateForm,
}: {
  updateForm: (form: LogsForm) => void;
}) {
  const form = useForm<LogsForm>({
    defaultValues: {
      startDate: null,
      endDate: null,
      userId: null,
      eventType: null,
      sortBy: null,
      sortOrder: "ASC",
    },
    onSubmit: async ({ value }) => {
      updateForm(value);
    },
    validatorAdapter: zodValidator,
  });
  return (
    <div className="p-8">
      <form.Provider>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? "..." : "Update"}
              </Button>
            )}
          />
        </form>
      </form.Provider>
    </div>
  );
}
