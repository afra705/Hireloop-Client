"use client"
import { Button } from "@/components/ui/button"
import { BookmarkButton } from "./bookmark-button"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import type { Job } from "@/types/job"
import type { JobApplicationInput } from "@/types/application"
import { applyToAJob } from "@/lib/actions/jobs"
import { getApplicationsCount } from "@/lib/api/applications"
import { toast } from "sonner"
import { getUserPremium } from "@/lib/api/users"

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
    toast.error("Job data is missing")
    return
  }

  if (!user) {
    router.push(
      `/sign-in?redirectTo=${encodeURIComponent(`/browse-jobs/${job._id}`)}`
    )
    return
  }

  if (user.role !== "seeker") {
    toast.error("Only job seekers can apply!")
    return
  }

  try {
    const countResult = await getApplicationsCount(
      `applicantId=${user.id}`
    )

    const premiumResult = await getUserPremium(user.id)
    
   console.log('premiumresult', premiumResult);
   
    if (!premiumResult.premium && countResult.count >= 2) {
      router.push("/dashboard/seeker/billing")
      return
    }

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

    const result = await applyToAJob(application)

    if (result?.insertedId) {
      toast.success("Applied successfully!")
      onApply?.()
      router.push("/browse-jobs")
    } else {
      toast.error("Application submission failed!")
    }

  } catch (error) {
    console.error("Application failed:", error)
    toast.error("Something went wrong!")
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
