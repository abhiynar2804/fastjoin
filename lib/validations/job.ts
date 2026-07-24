import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().trim().min(3).max(100),

  company: z.string().trim().min(2).max(100),

  location: z.string().trim().min(2).max(100),

  description: z.string().trim().min(20),

  requirements: z.string().trim().min(20),

  salary: z.number().nonnegative(),

  jobType: z.enum(["INTERNSHIP", "FULL_TIME"]),

  workMode: z.enum(["REMOTE", "HYBRID", "ONSITE"]),

  deadline: z.coerce.date(),
});