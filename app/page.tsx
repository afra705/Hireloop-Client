import { Banner } from "./home/Banner"
import { Navbar } from "./home/Navbar"

export default function Page() {
  return (
    <div className="min-h-svh bg-black">
      <Navbar />
      <Banner />
    </div>
  )
}
