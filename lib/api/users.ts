const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getUserPremium= async (userId: string)=> {
  const res = await fetch(`${BASE_URL}/users/${userId}/premium`, {
    cache: "no-store",
  })

  return res.json()
}