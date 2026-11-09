const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const getJobs = async () => {
  const res = await fetch(`${BASE_URL}/jobs`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to load jobs");
  }

  return res.json();
};

export const deleteJob = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);

    throw new Error(data?.message || "Failed to delete job");
  }

  return res.json();
};
