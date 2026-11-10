"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Globe,
  MapPin,
  Plus,
  Wallet,
} from "lucide-react"
import { toast } from "sonner"

import { PageHeader } from "@/components/dashboard/page-header"
import { FormField } from "@/components/form/form-field"
import { FormSection } from "@/components/form/form-section"
import {
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/form/text-field"
import { ToggleCard } from "@/components/form/toggle-card"
import { CreatJob } from "@/lib/actions/jobs"
import {
  FREQUENCIES,
  INITIAL_JOB_FORM,
  JOB_CATEGORIES,
  JOB_TYPES,
} from "@/lib/constants/jobs"
import { cn } from "@/lib/utils"
import type { JobForm } from "@/types/job"

// Kept for backwards compatibility with existing imports from this page.
export type { JobForm }

const AddJobsPage = () => {
  const router = useRouter()

  const [formData, setFormData] = useState<JobForm>(INITIAL_JOB_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleRemoteChange = () => {
    setFormData((previous) => ({
      ...previous,
      isRemote: !previous.isRemote,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await CreatJob(formData)

      console.log("result:", result)

      if (result.insertedId) {
        toast.success("Job created successfully!")
        setFormData(INITIAL_JOB_FORM)
        // router.push("/dashboard/recruiter/jobs");
      } else {
        toast.error("Failed to create job!")
      }
    } catch {
      toast.error("Failed to create job!")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-svh w-full min-w-0 overflow-x-hidden bg-[#0B0B0C] px-4 py-6 text-[#F4F4F5] [color-scheme:dark] sm:px-6 lg:px-8 lg:py-8">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-5xl min-w-0 space-y-8"
      >
        <PageHeader
          className="gap-5"
          breadcrumbClassName="mb-5 text-xs"
          breadcrumb={[
            { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
            { label: "Create New Listing" },
          ]}
          title="Post a New Job"
          titleClassName="text-2xl font-bold tracking-tight sm:text-3xl sm:leading-9"
          description="Fill in the position specifications to attract qualified talent across our network."
          descriptionClassName="mt-2 text-sm leading-6 text-gray-400"
          action={
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
          }
        />

        {/* Section 1: Basic Information */}
        <FormSection step={1} title="Basic Information">
          <div className="grid grid-cols-1 gap-5">
            <FormField label="Job Title" htmlFor="jobTitle" required>
              <TextField
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                required
              />
            </FormField>

            <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
              <FormField label="Company Name" htmlFor="companyName" required>
                <TextField
                  icon={<BriefcaseBusiness />}
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                />
              </FormField>

              <FormField label="Job Category" htmlFor="category" required>
                <SelectField
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>

                  {JOB_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </SelectField>
              </FormField>
            </div>

            <FormField label="Job Type" required>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {JOB_TYPES.map((type) => {
                  const isSelected = formData.jobType === type

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
                      className={cn(
                        "flex min-w-0 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm transition",
                        isSelected
                          ? "border-[#6554FF] bg-[#6554FF]/10 text-white"
                          : "border-[#29292D] bg-[#18181B] text-gray-400 hover:border-gray-500"
                      )}
                    >
                      {isSelected && <Check className="h-4 w-4" />}
                      {type}
                    </button>
                  )
                })}
              </div>
            </FormField>
          </div>
        </FormSection>

        <div className="border-t border-[#29292D]" />

        {/* Section 2: Location, Compensation & Timeline */}
        <FormSection step={2} title="Location, Compensation & Timeline">
          <ToggleCard
            checked={formData.isRemote}
            onChange={handleRemoteChange}
            title="Remote Work Allowed"
            description="Enable worldwide or distributed candidate applications"
            icon={<Globe />}
          />

          <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              label={
                <>
                  Job Location
                  <span className="ml-2 text-xs text-gray-500">(Required)</span>
                </>
              }
              htmlFor="location"
            >
              <TextField
                icon={<MapPin />}
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. New York, USA"
                required
              />
            </FormField>

            <FormField label="Application Deadline" htmlFor="deadline" required>
              <TextField
                icon={<CalendarDays />}
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </FormField>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-3">
            <FormField label="Min Salary / Rate" htmlFor="minSalary">
              <TextField
                icon={<Wallet />}
                id="minSalary"
                name="minSalary"
                type="number"
                min="0"
                value={formData.minSalary}
                onChange={handleChange}
                placeholder="e.g. 30000"
              />
            </FormField>

            <FormField label="Max Salary / Rate" htmlFor="maxSalary">
              <TextField
                icon={<Wallet />}
                id="maxSalary"
                name="maxSalary"
                type="number"
                min="0"
                value={formData.maxSalary}
                onChange={handleChange}
                placeholder="e.g. 60000"
              />
            </FormField>

            <FormField label="Frequency" htmlFor="frequency">
              <SelectField
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
              >
                {FREQUENCIES.map((frequency) => (
                  <option key={frequency} value={frequency}>
                    {frequency}
                  </option>
                ))}
              </SelectField>
            </FormField>
          </div>
        </FormSection>

        <div className="border-t border-[#29292D]" />

        {/* Section 3: Job Description */}
        <FormSection step={3} title="Job Description & Requirements">
          <div className="grid min-w-0 grid-cols-1 gap-5">
            <FormField
              label="Key Responsibilities"
              htmlFor="responsibilities"
              required
              hint="Explain what the selected candidate will be responsible for."
            >
              <TextAreaField
                id="responsibilities"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="Describe the main responsibilities of this position..."
                rows={6}
                required
              />
            </FormField>

            <FormField
              label="Qualifications & Requirements"
              htmlFor="qualifications"
              required
              hint="List the skills and qualifications candidates should have."
            >
              <TextAreaField
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                placeholder="Mention required skills, experience, education..."
                rows={6}
                required
              />
            </FormField>
          </div>
        </FormSection>
      </form>
    </main>
  )
}

export default AddJobsPage
