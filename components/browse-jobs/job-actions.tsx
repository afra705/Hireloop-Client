
"use client"

import { Button } from "@/components/ui/button"
import { BookmarkButton } from "./bookmark-button"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import type { Job } from "@/types/job"
import { email } from "better-auth"

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

 const handleApplyNow = () => {
  if (!job?._id) {
    console.error("Job data is missing")
    return
  }

  if (!user) {
    router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
    return
  }else{
    const applications = {
      jobId: job._id,
      userId: user.id,
      email:user.email,
      jobTitle: job.jobTitle,
      companyName: job.companyName

    }
    
  }

  onApply?.()
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
