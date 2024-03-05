"use client";

import Form from "@/src/components/form";
import Table from "@/src/components/table";
import { EventLog } from "@/src/types/event-log";
import { LogsForm } from "@/src/types/form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const getLogs = async (form: LogsForm) => {
  const searchParams = new URLSearchParams();
  if (form.sortBy && form.sortOrder) {
    searchParams.set("sortBy", form.sortBy);
    searchParams.set("sortOrder", form.sortOrder);
  }
  if (form.startDate) {
    searchParams.set("startDate", form.startDate.toISOString());
  }
  if (form.endDate) {
    searchParams.set("endDate", form.endDate.toISOString());
  }
  if (form.userId) {
    searchParams.set("userId", form.userId.toString());
  }
  if (form.eventType) {
    searchParams.set("eventType", form.eventType);
  }

  const response = await fetch(
    `http://localhost:3030/events/log?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export default function Home() {
  const [logForm, setLogForm] = useState<LogsForm>({
    startDate: null,
    endDate: null,
    userId: null,
    eventType: null,
    sortBy: null,
    sortOrder: "ASC",
  });

  const query = useQuery<EventLog[]>({
    placeholderData: [],
    queryKey: [
      "logs",
      logForm.startDate,
      logForm.endDate,
      logForm.userId,
      logForm.eventType,
      logForm.sortBy,
      logForm.sortOrder,
    ],
    queryFn: () => getLogs(logForm),
  });

  return (
    <main className="flex min-h-screen w-full max-h-screen">
      <div className="flex min-h-screen w-1/3 bg-white">
        <Form updateForm={setLogForm} />
      </div>
      <div className="flex min-h-screen w-2/3 bg-slate-900">
        <Table data={query.data} />
      </div>
    </main>
  );
}
