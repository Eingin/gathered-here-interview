"use client";

import Form from "@/src/components/form";
import Table from "@/src/components/table";
import { LogsForm } from "@/src/types/form";
import { useState } from "react";

export default function Home() {
  const [logForm, setLogForm] = useState<LogsForm>({
    startDate: null,
    endDate: null,
    userId: null,
    eventType: null,
    sortBy: null,
    sortOrder: "ASC",
  });

  return (
    <main className="flex min-h-screen w-full max-h-screen">
      <div className="flex min-h-screen w-1/3 bg-white">
        <Form updateForm={setLogForm} />
      </div>
      <div className="flex min-h-screen w-2/3 bg-slate-900">
        <Table data={[]} />
      </div>
    </main>
  );
}
