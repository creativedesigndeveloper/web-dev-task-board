import { Outlet } from "react-router-dom"
import Starfield from "./Starfield"


const Layout = () => {
  return (
    <>
      <Starfield />
      <Outlet />
    </>
  )
}

export default Layout