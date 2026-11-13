"use client"
import { Button } from "@/components/ui/button"
import { BookmarkButton } from "./bookmark-button"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import type { Job } from "@/types/job"
import type { JobApplicationInput } from "@/types/application"
import { applyToAJob } from "@/lib/actions/jobs"
import { getApplicationsCount } from "@/lib/api/applications"

type JobActionsProps = {
  jobTitle: string
  onApply?: () => void
  onBookmark?: () => void
  job: Job
}

export function JobActions({
  jobTitle,
  onApply,
  onBookmark,
  job,
}: JobActionsProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user

  const handleApplyNow = async () => {
    if (!job?._id) {
      console.error("Job data is missing")
      return
    }

    if (!user) {
      router.push(
        `/sign-in?redirectTo=${encodeURIComponent(`/browse-jobs/${job._id}`)}`
      )
      return
    }

    if (user.role !== "seeker") {
      console.log("User is not a job seeker")
      return
    }
    else if(user.role === 'seeker'){
      const countResult = await getApplicationsCount(`applicantId=${user.id}`)
      if(countResult.count >= 5){
        router.push('dashboard/seeker/billing')
      }
    
    }
    else{
    const application: JobApplicationInput = {
      jobId: job._id,
      userId: user.id,
      email: user.email,
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      category: job.category,
      jobType: job.jobType,
      workMode: job.isRemote ? "Remote" : "On-site",
      location: job.location,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      frequency: job.frequency,
      status: "Applied",
      appliedAt: new Date().toISOString(),
      archived: false,
    }

    try {
      const result = await applyToAJob(application)

      if (result?.insertedId) {
        console.log("Application submitted")
        onApply?.()
        router.push("/browse-jobs")
      }
    } catch (error) {
      console.error("Application failed:", error)
    }

    }

  }

  return (
    <div className="flex items-center gap-2">
      <BookmarkButton
        label={`Save ${jobTitle}`}
        onToggle={onBookmark}
        className="size-10 rounded-lg border border-white/[0.08] bg-[#1A1A1D]"
      />

      <Button
        type="button"
        onClick={handleApplyNow}
        className="h-10 rounded-lg bg-white px-5 text-sm font-semibold text-[#0B0B0C] hover:bg-white/90"
      >
        Apply Now
      </Button>
    </div>
  )
}
