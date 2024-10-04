import "./commentpopup.css"
import { Close } from "@material-ui/icons"

export default function Commentpopup(props) {
  return (props.trigger) ? (
    <div className="commentPopUp">
      <div className="commentPopUp-Inner">
          <Close onClick = {() => props.setTrigger(false)} className="close-btn"/>
          {props.children}
      </div>
   </div>
) : "" ;
}
