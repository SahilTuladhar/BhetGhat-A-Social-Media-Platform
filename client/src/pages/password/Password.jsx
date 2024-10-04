import "./password.css"
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Settingsopt from "../../components/settingsopt/Settingsopt"

export default function Password() {
  return (
    <div>
      <Topbar/>
      <div className="passwordContainer">
        <Sidebar settings /> 
        <Settingsopt />
      </div>
    </div>
  )
}
