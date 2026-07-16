import { requireRecruiter } from "@/lib/auth";
import CreateJobForm from "./CreateJobForm";

export default async function CreateJobPage() {
  await requireRecruiter();

  return <CreateJobForm />;
}