import { Outlet } from "react-router-dom"
import { Nav } from "../components"

export default function Roots() {
  return (
    <div>
        <Nav/>        
      <Outlet/>
    </div>
  )
}

