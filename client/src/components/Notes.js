import React, { useState, useEffect } from "react";
import CreateArea from "./CreateArea ";
import Header from "./Header"
import Footer from "./Footer"
import Note from "./Note ";
import axios from "axios";

function Notes(props) {
    // When to perform Resquest to the server 
    // 1 . When page gets load 
    // 2. New Note get created 
    // 3. Note deleted
    function RequestAPI(boolean) {
        setrequestToAPI(boolean);
    }

    let [requestToAPI, setrequestToAPI] = useState(false)
    var NotesList = [];
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        //Get Notes from the server 
        // on first reloading and when new Note get created and deleted.
        axios
            //"/api/notes/:id"
            .get("/api/notes/%20")
            .then((res) => {
                res.data.forEach(newNote => {
                    NotesList.push(newNote);
                });
                setNotes(NotesList);
                NotesList = []
            })
        RequestAPI(false);

    }, [requestToAPI])


    async function deleteNote(id) {
        await axios.delete(`/api/notes/${id}`)
            .then(res => {
                console.log(res)
                RequestAPI(true);
            })
            .catch(err => console.log(err))

    }
    return (<div>

        <CreateArea
            requestToAPI={RequestAPI}
        />
        {notes.map((noteItem) => {
            return (
                <Note
                    key={noteItem._id}
                    id={noteItem._id}
                    title={noteItem.title}
                    content={noteItem.content}
                    onDelete={deleteNote}
                />)
        })}

    </div>);


}

export default Notes;