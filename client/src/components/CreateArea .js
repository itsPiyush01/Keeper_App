import React, { useState } from "react";
import Input from "./Input"
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [isExpanded, setExpanded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((preNote) => {
      return {
        ...preNote,
        [name]: value,
      };
    });
  }
  // async
  function submitNote(event) {
    console.log(note.title + "  " + note.content);
    event.preventDefault();
    // await
    axios
      //"/api/notes/:id"
      .post("/api/notes/%20", {
        title: note.title,
        content: note.content,
      })
      .then(function (response) {
        console.log("Sever Response");
        console.log(response);
        setNote({
          title: "",
          content: "",
        });
        props.requestToAPI(true);
      })
      .catch(function (error) {
        console.log("Error:" + error);
      });
  }

  function handleExtend() {
    setExpanded(true)
  }
  return (
    <>
      <form className="create-note" onSubmit={submitNote}>
        {isExpanded && (
          <Input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            autoComplete="off"
          />
        )}

        <textarea
          onClick={handleExtend}
          name="content"
          placeholder="Take a note..."
          autoComplete="off"
          value={note.content}
          onChange={handleChange}
          rows={isExpanded ? "3" : "1"}
        ></textarea>

        <Zoom in={isExpanded}>
          <Fab type="submit" >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </>
  );
}

export default CreateArea;
