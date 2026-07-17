import { requireStudent } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ResumeUpload from "@/components/student/resume/ResumeUpload";

export default async function ResumePage() {
  const session = await requireStudent();

  const resume = await prisma.resume.findUnique({
    where: {
      studentId: session.user.id,
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Resume
      </h1>

      <ResumeUpload />

      {resume ? (
        <div className="border rounded-lg p-6">
          <p><strong>File:</strong> {resume.fileName}</p>

          <a
            href={`/api/resume/${session.user.id}`}
            target="_blank"
            className="text-blue-600"
          >
            View Resume
          </a>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          No Resume Uploaded
        </div>
      )}
    </div>
  );
}