import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ResumeUpload from "@/components/student/resume/ResumeUpload";

export default async function ResumePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

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
            href={resume.resumeUrl}
            target="_blank"
            className="text-blue-600"
          >
            Download Resume
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