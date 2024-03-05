"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { LogsForm } from "../types/form";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { Order } from "../constants/order";

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
          <div className="mt-4 pb-2 border-b mb-2">
            <h2 className=" text-lg text-black font-bold">Filtering</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="startDate"
              validators={{
                onSubmit: z
                  .date()
                  .max(form.state.values?.endDate ?? new Date(8.64e15), {
                    message: "Start date must be before end date",
                  })
                  .nullable(),
              }}
              children={(field) => {
                const endDateField = form.useField({ name: "endDate" });
                return (
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor={field.name} value="Start Date" />
                    </div>
                    <TextInput
                      type="datetime-local"
                      id={field.name}
                      value={field.state.value?.toISOString().slice(0, 16)}
                      onBlur={() => field.handleBlur()}
                      onBlur={() => {
                        field.handleBlur();
                        endDateField.validate("blur");
                      }}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value === ""
                            ? null
                            : new Date(e.target.value)
                        )
                      }
                      color={
                        field.state.meta.errors.length > 0
                          ? "failure"
                          : undefined
                      }
                      helperText={<>{field.state.meta.errors.join(", ")}</>}
                    />
                  </div>
                );
              }}
            />
            <form.Field
              name="endDate"
              validators={{
                onSubmit: z
                  .date()
                  .min(form.state.values?.startDate ?? new Date(0), {
                    message: "End date must be after start date",
                  })
                  .nullable(),
              }}
              children={(field) => {
                const startDateField = form.useField({ name: "startDate" });
                return (
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor={field.name} value="End Date" />
                    </div>
                    <TextInput
                      type="datetime-local"
                      id={field.name}
                      value={field.state.value?.toISOString().slice(0, 16)}
                      onBlur={() => field.handleBlur()}
                      onBlur={() => {
                        field.handleBlur();
                        startDateField.validate("blur");
                      }}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value === ""
                            ? null
                            : new Date(e.target.value)
                        )
                      }
                      color={
                        field.state.meta.errors.length > 0
                          ? "failure"
                          : undefined
                      }
                      helperText={<>{field.state.meta.errors.join(", ")}</>}
                    />
                  </div>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="userId"
              validators={{
                onChange: z
                  .number()
                  .int()
                  .min(1, "User ID must be greater than 0")
                  .nullable(),
              }}
              children={(field) => {
                return (
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor={field.name} value="User ID" />
                    </div>
                    <TextInput
                      type="number"
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          Number.isNaN(e.target.valueAsNumber)
                            ? null
                            : e.target.valueAsNumber
                        )
                      }
                      color={
                        field.state.meta.errors.length > 0
                          ? "failure"
                          : undefined
                      }
                      helperText={<>{field.state.meta.errors.join(", ")}</>}
                    />
                  </div>
                );
              }}
            />
            <form.Field
              name="eventType"
              children={(field) => {
                return (
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor={field.name} value="Event Type" />
                    </div>
                    <Select
                      color={
                        field.state.meta.errors.length > 0
                          ? "failure"
                          : undefined
                      }
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value === "" ? null : e.target.value
                        )
                      }
                    >
                      <option value="">--none--</option>
                      <option>submit_form</option>
                      <option>click_button</option>
                      <option>view_page</option>
                      <option>logout</option>
                    </Select>
                  </div>
                );
              }}
            />
          </div>
          <div className="mt-4 pb-2 border-b mb-2">
            <h2 className=" text-lg text-black font-bold">Sorting</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="sortBy"
              children={(field) => {
                return (
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor={field.name} value="Sort By" />
                    </div>
                    <Select
                      color={
                        field.state.meta.errors.length > 0
                          ? "failure"
                          : undefined
                      }
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value === "" ? null : e.target.value
                        )
                      }
                    >
                      <option value="">--none--</option>
                      <option value="timestamp">Timestamp</option>
                      <option value="userId">User Id</option>
                      <option value="eventType">Event Type</option>
                    </Select>
                  </div>
                );
              }}
            />
            <form.Field
              name="sortOrder"
              children={(field) => {
                return (
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor={field.name} value="Sort Order" />
                    </div>
                    <Select
                      color={
                        field.state.meta.errors.length > 0
                          ? "failure"
                          : undefined
                      }
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value as Order)
                      }
                    >
                      <option value="ASC">ASC</option>
                      <option value="DESC">DESC</option>
                    </Select>
                  </div>
                );
              }}
            />
          </div>
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
