import "./settings.css"
import Topbar from '../../components/topbar/Topbar';
import Sidebar from "../../components/sidebar/Sidebar";
import Settingsfeed from "../../components/settingsfeed/Settingsfeed";



export default function Settings() {
  return (
    <div>
      <Topbar/>
      <div className="settingsContainer">
        <Sidebar settings />
        <Settingsfeed />
      </div>
    </div>
  )
}
