import "./commentpopupfeed.css"
import Commentpost from "../commentpost/Commentpost"


export default function Commentpopupfeed({post}) {



  return (
    <div className="commentfeed">
      <div className="commentFeedWrapper">
        
        <Commentpost post={post}/>
        
      </div>
   </div>
  )
}
