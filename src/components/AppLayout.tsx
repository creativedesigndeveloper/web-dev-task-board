import { useState } from "react"
import { Sidebar } from "./Sidebar"

interface AppLayoutProps {
  children: React.ReactNode
}


export const AppLayout = ({ children }: AppLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex bg-bg-primary min-h-screen">
      {/* Burger Button */}
      <button className="text-text-primary text-3xl fixed left-2 top-4 md:hidden" onClick={() => setIsSidebarOpen(true)}>☰</button>
      {/*  Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {/*  main content area */}
      <main>
        {children}
      </main>
    </div>
  )



}