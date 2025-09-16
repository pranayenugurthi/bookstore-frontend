import "./index.css"
import { useEffect, useState } from "react";

const Comment=({handleAddComment,comments})=>{
     const [userComment,setUserComment]=useState("");
     const onAddComment=()=>{
       // console.log("Adding comment in Comment component:", userComment);
         handleAddComment(userComment);
         setUserComment("");
     }
     // console.log("comments in comment component",comments)
     const dateTime=(date)=>{
          const past = new Date(date);
            const now = new Date();
            // console.log(past,now)
            let formatted;
            if(past.getDate()===now.getDate()){
                formatted = past.toLocaleString("en-IN", {
                    hour: "2-digit",   // "07"
                    minute: "2-digit", // "10"
                    hour12: true       // AM/PM format
                    });
                formatted="today "+formatted;
            }else{
                formatted = past.toLocaleString("en-IN", {
                day: "numeric",    // "14"
                month: "long",     // "September"
                hour: "2-digit",   // "07"
                minute: "2-digit", // "10"
                hour12: true       // AM/PM format
                });
            }
             
            // console.log(formatted)
            return formatted;
            // const diff = Math.floor((now - past) / 1000); // in seconds

            // if (diff < 60) return `few sec ago`;
            // if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
            // if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
            // return `${Math.floor(diff / 86400)} days ago`;
    }
   
    return(
        <div className="commentsContainer">
            <h1 className="commentsHead">Comments</h1>
            <ul className="commentsList">
                {comments.length === 0 ? (
                    <p className="noCommentsMessage">No comments for this book yet...</p>
                ) : (
                    comments.map(comment=>(
                        <li key={comment.id} className="commentItem">
                            <p className="commentText"><span className="commentUser">{comment.username}:</span> {comment.comment}</p>
                            <p className="commentDate">{(dateTime(comment.timestamp))}</p>
                        </li>
                    )))
                }
              
            </ul>
            <textarea placeholder="Write your comment here..." className="commentInput" rows={2} value={userComment} onChange={(e) => setUserComment(e.target.value)}></textarea>
            <button className="addCommentBtn" onClick={onAddComment}>Add Comment</button>
        </div>
    )
}
export default Comment;