
import type { Metadata } from "next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { ApplicationsView } from "@/components/applications/applications-view"
import { getApplications } from "@/lib/api/applications"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
  title: "My Applications | HireLoop",
  description: "Track the status of every job you have applied to on HireLoop.",
}

const MyApplicationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })


  const applications = await getApplications(`applicantId=${session?.user.id}`)

  return <ApplicationsView applications={applications} />
}

export default MyApplicationsPage
