import "./update.css"
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Settingsopt from "../../components/settingsopt/Settingsopt"

export default function Update() {
  return (
    <div>
    <Topbar/>
    <div className="updateContainer">
      <Sidebar settings /> 
      <Settingsopt update/>
    </div>
  </div>
  )
}
