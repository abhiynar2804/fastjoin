"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Building2, MapPin, DollarSign, Calendar, FileText, AlertCircle } from "lucide-react";

export default function CreateJobForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
    jobType: "FULL_TIME",
    workMode: "ONSITE",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/recruiter/jobs");
      } else {
        const data = await res.json();
        
        // Handle error responses safely (strings vs Zod error objects)
        if (typeof data.error === "string") {
          setError(data.error);
        } else if (data.error && typeof data.error === "object") {
          if (data.error.fieldErrors && Object.keys(data.error.fieldErrors).length > 0) {
            const fieldMsgs = Object.entries(data.error.fieldErrors)
              .map(([field, errs]: [string, any]) => {
                const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
                const msg = Array.isArray(errs) ? errs.join(", ") : String(errs);
                return `${fieldName}: ${msg}`;
              })
              .join(" | ");
            setError(`Validation Error: ${fieldMsgs}`);
          } else if (Array.isArray(data.error.formErrors) && data.error.formErrors.length > 0) {
            setError(data.error.formErrors.join(" | "));
          } else {
            setError("Validation failed. Please verify your inputs.");
          }
        } else {
          setError(data.message || "Failed to post job listing.");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {error && (
        <div className="p-4 rounded-xl text-sm flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="font-medium leading-relaxed">{error}</div>
        </div>
      )}

      {/* Section 1: Basic Role Information */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-5">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          Job Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-medium mb-1.5">Job Title</label>
            <input
              name="title"
              type="text"
              required
              minLength={3}
              maxLength={100}
              placeholder="Software Engineer Intern"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Company Name</label>
            <input
              name="company"
              type="text"
              required
              minLength={2}
              maxLength={100}
              placeholder="Acme Corp"
              value={form.company}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Location</label>
            <input
              name="location"
              type="text"
              required
              minLength={2}
              maxLength={100}
              placeholder="Bangalore, India"
              value={form.location}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Numeric Salary Amount</label>
            <input
              name="salary"
              type="number"
              min="0"
              required
              placeholder="600000"
              value={form.salary}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
            />
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
              Enter numbers only (e.g. 600000 for ₹6 LPA or 50000 for monthly stipend).
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Type, Mode & Deadline */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-5">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          Role Classification & Deadline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-medium mb-1.5">Job Type</label>
            <select
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
            >
              <option value="FULL_TIME" className="dark:bg-zinc-900">Full Time</option>
              <option value="INTERNSHIP" className="dark:bg-zinc-900">Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Work Mode</label>
            <select
              name="workMode"
              value={form.workMode}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
            >
              <option value="ONSITE" className="dark:bg-zinc-900">Onsite</option>
              <option value="REMOTE" className="dark:bg-zinc-900">Remote</option>
              <option value="HYBRID" className="dark:bg-zinc-900">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Application Deadline</label>
            <input
              type="date"
              name="deadline"
              required
              value={form.deadline}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Description & Requirements */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-5">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          Detailed Description & Requirements
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Job Description (min 20 characters)</label>
            <textarea
              name="description"
              required
              minLength={20}
              rows={4}
              placeholder="Provide key responsibilities and role details (minimum 20 characters)..."
              value={form.description}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Role Requirements & Qualifications (min 20 characters)</label>
            <textarea
              name="requirements"
              required
              minLength={20}
              rows={4}
              placeholder="List required technical skills, degree, CGPA criteria (minimum 20 characters)..."
              value={form.requirements}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-white btn-primary disabled:opacity-50 cursor-pointer shadow-md shadow-teal-500/20 dark:shadow-purple-500/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{loading ? "Publishing Job..." : "Publish Job Listing"}</span>
        </button>
      </div>
    </form>
  );
}