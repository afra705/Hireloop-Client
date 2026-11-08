"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  Globe,
  MapPin,
  Plus,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

type Frequency = "Yearly" | "Monthly" | "Weekly" | "Hourly";

type JobForm = {
  jobTitle: string;
  companyName: string;
  category: string;
  jobType: JobType;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: Frequency;
  responsibilities: string;
  qualifications: string;
};

const initialForm: JobForm = {
  jobTitle: "",
  companyName: "",
  category: "",
  jobType: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "Yearly",
  responsibilities: "",
  qualifications: "",
};

const jobTypes: JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

const categories = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing",
  "Business & Finance",
  "Education",
  "Healthcare",
  "Customer Support",
  "Other",
];

const frequencies: Frequency[] = [
  "Yearly",
  "Monthly",
  "Weekly",
  "Hourly",
];

const inputClass =
  "w-full min-w-0 rounded-xl border border-[#29292D] bg-[#18181B] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#6554FF] focus:ring-1 focus:ring-[#6554FF]";

const labelClass = "mb-2 block text-sm font-medium text-gray-300";

const sectionTitleClass =
  "flex items-center gap-3 text-base font-semibold text-white";

const AddJobsPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<JobForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRemoteChange = () => {
    setFormData((previous) => ({
      ...previous,
      isRemote: !previous.isRemote,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
  }

  return (
    <main className="min-h-svh w-full min-w-0 overflow-x-hidden bg-[#0B0B0C] px-4 py-6 text-[#F4F4F5] sm:px-6 lg:px-8 lg:py-8 [color-scheme:dark]">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-5xl min-w-0 space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <span>Manage Jobs</span>
              <ChevronDown className="h-3 w-3 -rotate-90" />
              <span className="text-gray-200">Create New Listing</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Post a New Job
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Fill in the position specifications to attract qualified
              talent across our network.
            </p>
          </div>

        {/* Bottom Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-[#29292D] pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full rounded-xl border border-[#29292D] px-6 py-3 text-sm font-medium text-gray-300 transition hover:bg-[#18181B] sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6554FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5745ed] disabled:opacity-60 sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            {isSubmitting ? "Publishing..." : "Publish Job"}
          </button>
        </div>
        </div>

        {/* Section 1: Basic Information */}
        <section className="space-y-6">
          <h2 className={sectionTitleClass}>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6554FF] text-xs">
              1
            </span>
            Basic Information
          </h2>

          <div className="grid grid-cols-1 gap-5">
            {/* Job Title */}
            <div className="min-w-0">
              <label htmlFor="jobTitle" className={labelClass}>
                Job Title <span className="text-red-400">*</span>
              </label>

              <input
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                className={inputClass}
                required
              />
            </div>

            {/* Company Name & Category */}
            <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
              <div className="min-w-0">
                <label htmlFor="companyName" className={labelClass}>
                  Company Name <span className="text-red-400">*</span>
                </label>

                <div className="relative">
                  <BriefcaseBusiness className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                  <input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label htmlFor="category" className={labelClass}>
                  Job Category <span className="text-red-400">*</span>
                </label>

                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select a category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Job Type */}
            <div className="min-w-0">
              <label className={labelClass}>
                Job Type <span className="text-red-400">*</span>
              </label>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {jobTypes.map((type) => {
                  const isSelected = formData.jobType === type;

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setFormData((previous) => ({
                          ...previous,
                          jobType: type,
                        }))
                      }
                      className={`flex min-w-0 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm transition ${
                        isSelected
                          ? "border-[#6554FF] bg-[#6554FF]/10 text-white"
                          : "border-[#29292D] bg-[#18181B] text-gray-400 hover:border-gray-500"
                      }`}
                    >
                      {isSelected && <Check className="h-4 w-4" />}
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-[#29292D]" />

        {/* Section 2: Location, Compensation & Timeline */}
        <section className="space-y-6">
          <h2 className={sectionTitleClass}>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6554FF] text-xs">
              2
            </span>
            Location, Compensation & Timeline
          </h2>

          {/* Remote Toggle */}
          <div className="flex min-w-0 items-center justify-between gap-4 rounded-xl border border-[#29292D] bg-[#18181B] p-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#242428]">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-white">
                  Remote Work Allowed
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={formData.isRemote}
              onClick={handleRemoteChange}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                formData.isRemote ? "bg-[#6554FF]" : "bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  formData.isRemote ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Location & Deadline */}
          <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
            <div className="min-w-0">
              <label htmlFor="location" className={labelClass}>
                Job Location
                <span className="ml-2 text-xs text-gray-500">
                  (Required)
                </span>
              </label>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. New York, USA"
                  className={`${inputClass} pl-11`}
                  required
                />
              </div>
            </div>

            <div className="min-w-0">
              <label htmlFor="deadline" className={labelClass}>
                Application Deadline
                <span className="ml-2 text-red-400">*</span>
              </label>

              <div className="relative">
                <CalendarDays className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  className={`${inputClass} pl-11`}
                  required
                />
              </div>
            </div>
          </div>

          {/* Salary */}
          <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-3">
            <div className="min-w-0">
              <label htmlFor="minSalary" className={labelClass}>
                Min Salary / Rate
              </label>

              <div className="relative">
                <Wallet className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                <input
                  id="minSalary"
                  name="minSalary"
                  type="number"
                  min="0"
                  value={formData.minSalary}
                  onChange={handleChange}
                  placeholder="e.g. 30000"
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div className="min-w-0">
              <label htmlFor="maxSalary" className={labelClass}>
                Max Salary / Rate
              </label>

              <div className="relative">
                <Wallet className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                <input
                  id="maxSalary"
                  name="maxSalary"
                  type="number"
                  min="0"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  placeholder="e.g. 60000"
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div className="min-w-0">
              <label htmlFor="frequency" className={labelClass}>
                Frequency
              </label>

              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className={inputClass}
              >
                {frequencies.map((frequency) => (
                  <option key={frequency} value={frequency}>
                    {frequency}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <div className="border-t border-[#29292D]" />

        {/* Section 3: Job Description */}
        <section className="space-y-6">
          <h2 className={sectionTitleClass}>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6554FF] text-xs">
              3
            </span>
            Job Description & Requirements
          </h2>

          <div className="grid min-w-0 grid-cols-1 gap-5">
            {/* Responsibilities */}
            <div className="min-w-0">
              <label htmlFor="responsibilities" className={labelClass}>
                Key Responsibilities
                <span className="ml-2 text-red-400">*</span>
              </label>

              <textarea
                id="responsibilities"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="Describe the main responsibilities of this position..."
                rows={6}
                className={`${inputClass} resize-y`}
                required
              />

              <p className="mt-2 text-xs text-gray-500">
                Explain what the selected candidate will be responsible for.
              </p>
            </div>

            {/* Qualifications */}
            <div className="min-w-0">
              <label htmlFor="qualifications" className={labelClass}>
                Qualifications & Requirements
                <span className="ml-2 text-red-400">*</span>
              </label>

              <textarea
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                placeholder="Mention required skills, experience, education..."
                rows={6}
                className={`${inputClass} resize-y`}
                required
              />

              <p className="mt-2 text-xs text-gray-500">
                List the skills and qualifications candidates should have.
              </p>
            </div>
          </div>
        </section>

       
      </form>
    </main>
  );
};

export default AddJobsPage;