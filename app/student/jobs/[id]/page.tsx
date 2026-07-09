type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobDetailsPage({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <h1 className="text-3xl font-bold">Job Details</h1>

      <p className="mt-4">Job ID: {id}</p>

      <p className="mt-4">
        We will display complete job details here in the next sprint.
      </p>
    </div>
  );
}