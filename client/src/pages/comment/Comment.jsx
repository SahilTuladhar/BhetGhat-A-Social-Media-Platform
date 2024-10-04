import "./comment.css"
import Topbar from '../../components/topbar/Topbar';
import Sidebar from "../../components/sidebar/Sidebar";
import Commentfeed from "../../components/commentfeed/Commentfeed";

export default function Comment() {
  return (
    <>
       <Topbar />
       <div className="commentContainer">
          <Sidebar bookmark />
          <Commentfeed/>
        </div>
   
     </>
  )
}
