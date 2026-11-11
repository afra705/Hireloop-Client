import type { Metadata } from "next"

import { ApplicationsView } from "@/components/applications/applications-view"

import { dummyApplications } from "./dummy-applications"

export const metadata: Metadata = {
  title: "My Applications | HireLoop",
  description: "Track the status of every job you have applied to on HireLoop.",
}

const MyApplicationsPage = () => {
  return <ApplicationsView applications={dummyApplications} />
}

export default MyApplicationsPage
