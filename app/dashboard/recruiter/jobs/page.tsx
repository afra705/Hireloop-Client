
import Link from "next/link";
import {
  MapPinIcon,
  PencilIcon,
  PlusIcon,
  UsersIcon,
  CopyIcon,
} from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { getJobs } from "@/lib/api/jobs";
import { cn } from "@/lib/utils";
import type { Job, JobStatus } from "@/types/job";
import DeleteJobDialog from "./delete-job-dialog";

const ManageJobsPage = async () => {
  const jobs: Job[] = await getJobs();

  return (
    <div className="min-h-svh bg-[#0B0B0C] px-4 py-6 text-[#F4F4F5] sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-[1200px]">

        <PageHeader
          className="mb-6"
          breadcrumb={[
            { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
            { label: "Job Listings & Posting" },
          ]}
          title="Manage Job Posts"
          description="Review live listings, monitor applicants, and update job details across your organization."
          action={
            <Link
              href="/dashboard/recruiter/jobs/new"
              className="inline-flex h-9 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-[#5C53FE] px-4 text-xs font-semibold text-white shadow-[0_8px_24px_-8px_rgba(92,83,254,0.8)] transition-colors hover:bg-[#6C64FF] focus-visible:ring-2 focus-visible:ring-[#8F88FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0C] focus-visible:outline-none"
            >
              <PlusIcon className="size-3.5" />
              New Job Post
            </Link>
          }
        />

        {/* Jobs Table */}
        <div className="overflow-x-auto border-y border-white/[0.06]">
          <table className="w-full min-w-[1020px] border-collapse text-left">
            <caption className="sr-only">
              List of job posts
            </caption>

            <thead>
              <tr className="bg-[#111113]">
                {[
                  "Job Title & Dept",
                  "Company & Location",
                  "Type",
                  "Compensation",
                  "Applicants",
                  "Status",
                  "Deadline",
                  "Actions",
                ].map((heading, index) => (
                  <th
                    key={heading}
                    scope="col"
                    className={cn(
                      "border-b border-white/[0.06] px-3 py-2.5 text-[10px] font-medium tracking-[0.06em] whitespace-nowrap text-[#7C7F87] uppercase",
                      index === 0 && "pl-4",
                      index === 7 && "pr-4 text-right"
                    )}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job) => {
                 const status: JobStatus = "Active";

                  return (
                    <tr
                      key={job._id}
                      className="border-b border-white/[0.05] transition-colors last:border-b-0 hover:bg-white/[0.02]"
                    >
                      {/* Job Title & Department */}
                      <td className="px-3 py-2.5 pl-4">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="flex size-6 shrink-0 items-center justify-center rounded-[5px] bg-[#5C53FE]/15 text-[10px] font-bold text-[#B3AEFF] ring-1 ring-white/10"
                          >
                            {job.companyName?.charAt(0) || "J"}
                          </span>

                          <div className="min-w-0">
                            <p className="truncate text-xs leading-4 font-medium text-[#F4F4F5]">
                              {job.jobTitle}
                            </p>

                            <p className="mt-0.5 truncate text-[10px] leading-3 text-[#7C7F87]">
                              {job.category}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Company & Location */}
                      <td className="px-3 py-2.5">
                        <p className="text-xs leading-4 whitespace-nowrap text-[#D4D4D8]">
                          {job.companyName}
                        </p>

                        <p className="mt-0.5 flex items-center gap-1 text-[10px] leading-3 whitespace-nowrap text-[#7C7F87]">
                          <MapPinIcon className="size-2.5 shrink-0" />
                          {job.isRemote ? "Remote" : job.location}
                        </p>
                      </td>

                      {/* Job Type */}
                      <td className="px-3 py-2.5 text-xs whitespace-nowrap text-[#A1A4AA]">
                        {job.jobType}
                      </td>

                      {/* Compensation */}
                      <td className="px-3 py-2.5 text-xs whitespace-nowrap text-[#D4D4D8]">
                        ${job.minSalary} - ${job.maxSalary}
                        <span className="text-[#7C7F87]">
                          {" "}/ {job.frequency}
                        </span>
                      </td>

                      {/* Applicants */}
                      <td className="px-3 py-2.5">
                        <span className="flex items-center gap-1.5 text-[11px] whitespace-nowrap">
                          <UsersIcon className="size-3 text-[#7C7F87]" />

                          <span className="text-[#D4D4D8]">
                            {job.applicants ?? 0}
                          </span>

                          <span className="text-[#7C7F87]">
                            Candidates
                          </span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-3 py-2.5">
                        <StatusBadge status={status} />
                      </td>

                      {/* Deadline */}
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <p className="text-[11px] leading-4 text-[#D4D4D8]">
                          {new Date(job.deadline).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>

                        <p className="mt-0.5 text-[10px] leading-3 text-[#7C7F87]">
                          Application deadline
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-2.5 pr-4">
                        <div className="flex items-center justify-end gap-1.5">

                          <Link
                            href={`/dashboard/recruiter/jobs/${job._id}/edit`}
                            aria-label={`Edit ${job.jobTitle}`}
                            title="Edit job"
                            className="inline-flex h-6 items-center gap-1 rounded-md border border-[#5C53FE]/35 bg-[#5C53FE]/[0.08] px-2 text-[10px] font-medium text-[#B3AEFF] transition-colors hover:bg-[#5C53FE]/[0.16] focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 focus-visible:outline-none"
                          >
                            <PencilIcon className="size-2.5" />
                            Update
                          </Link>

                          <button
                            type="button"
                            aria-label={`Duplicate ${job.jobTitle}`}
                            title="Duplicate job"
                            className="inline-flex size-6 items-center justify-center rounded-md text-[#7C7F87] transition-colors hover:bg-white/[0.06] hover:text-[#F4F4F5] focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 focus-visible:outline-none"
                          >
                            <CopyIcon className="size-3" />
                          </button>

                          <DeleteJobDialog
                            jobId={job._id}
                            jobTitle={job.jobTitle}
                          />

                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-sm text-[#7C7F87]"
                  >
                    No jobs found. Create your first job post.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ManageJobsPage;
