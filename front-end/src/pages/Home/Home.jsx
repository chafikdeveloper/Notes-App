import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/cards/NoteCard";
import AddEditNote from "./AddEditNote";
import Toast from "../../components/ToastMessages/Toast";
import EmptyCard from "../../components/cards/EmptyCard";
import { RiFileForbidFill } from "react-icons/ri";
import { MdNoteAdd } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import axios from "../../utils/axios";


const Home = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: "null",
  });

  const [showToastMessage, setShowToastMessage] = useState({
    isShown: false,
    message: "",
    type: 'add'
  })

  const OpenToastMessage = (message, type) => {
    setShowToastMessage({
      isShown: true,
      message,
      type
    })
  }

  const handleCloseToast = () => {
    setShowToastMessage({
      isShown: false,
      message: ""
    })
  }  

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const getAllNotes = async () => {
    try {
      const response = await axios.get("/get-notes");

      if (response.data.status === "success") {
        setAllNotes(response.data.notes);
      }

    } catch (error) {
      console.log("Unexpected error happened. Please try again");
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await axios.delete(`/delete-note/${noteId}`)

      if (response.data && response.data.status === 'success') {
        OpenToastMessage("Note deleted successfully", 'delete')
        getAllNotes();
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("Unexpected error happened. Please try again")
      }
    }
  }

  const onSearchNote = async (query) => {
    try {
      const response = await axios.get('/search-notes', {
        params: {query}
      })

      if (response.data.status === 'success') {
        setIsSearch(true)
        setAllNotes(response.data.notes)
      }
      
    } catch (error) {
      if (error.response.data.message) {
        console.log("Unexpected error happened. Please try again")
      }
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false)
    getAllNotes()
  }

  const pinNote = async (note) => {
    const noteId = note.id
    const pin = note.isPinned
    try {
      const response = await axios.patch(`/pin-note/${noteId}`, {
        isPinned: !pin
      })

      if (response.data.status === 'success') {
        getAllNotes();
      }
    } catch (error) {
      if (error.response.data.message) {
        console.log("Unexpected error happened. Please try again")
      }
    }
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

      <div className="container mx-auto">
        {allNotes.length > 0 ? <div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes.map((item, index) => (
            <NoteCard
              key={item.id}
              title={item.title}
              date={moment(item.createdAt).format("D MMM YYYY")}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNote(item.id)}
              onPinNote={() => pinNote(item)}
            />
          ))}
        </div> : <EmptyCard isSearch={isSearch} message={isSearch ? `Oops! No notes found matching your search.` : `Start creating your first note! Click the 'Add' button to drop down your thoughts, ideas and reminders. Let's get started`} />}
      </div>

      <button
        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          OpenToastMessage={OpenToastMessage}
        />
      </Modal>

      <Toast isShown={showToastMessage.isShown} message={showToastMessage.message} type={showToastMessage.type} onClose={handleCloseToast} />
    </>
  );
};

export default Home;
