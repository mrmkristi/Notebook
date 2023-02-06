import { DeleteRounded } from "@mui/icons-material";
import React from "react";

function Note(props) {

    function handleClick() {
        props.onDelete({
            id: props.id,
            title: props.title,
            content: props.content,
            time: props.time
        });
    }

    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p className="display-scroll">{props.content}</p>
            <p className="display-time">{props.time}</p>
            <DeleteRounded onClick={handleClick} />
        </div>
    );
}

export default Note;