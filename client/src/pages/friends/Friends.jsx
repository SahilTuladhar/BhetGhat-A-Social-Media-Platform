import "./friends.css"
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Friendsfeed from "../../components/friendsfeed/Friendsfeed";


export default function friends() {
  return (
     <>
       <Topbar />

       <div className="friends">
          <Sidebar />
          <Friendsfeed/>
          <Rightbar />
       </div>

     </>
  )
}
