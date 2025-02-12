import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axios from '../../utils/axios'

const AddEditNote = ({noteData, type, getAllNotes, onClose, OpenToastMessage}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null)

  // add Note
  const addNewNote = async () => {
    try {
      const response = await axios.post('/create-note', {
        title, content, tags
      })

      if (response.data.status === 'success') {
        OpenToastMessage("Note added successfully")
        getAllNotes()
        onClose()
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      }
    }
  }

  // edit note
  const editNote = async () => {
    try {
      const response = await axios.patch(`/update-note/${noteData.id}`, {
        title, content, tags
      })

      if (response.data && response.data.note) {
        OpenToastMessage("Note updated successfully")
        getAllNotes()
        onClose()
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      }
    }
  }

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter a title")
      return;
    }
    if (!content) {
      setError("Please enter the content")
      return;
    }
    setError("")

    if (type === 'edit') {
      editNote()
    } else {
      addNewNote();
    }
  }
  
  return (
    <div className="relative">
      <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50" onClick={onClose}>
        <MdClose  className="text-xl text-slate-400"/>
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({target}) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
        {type === "edit" ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default AddEditNote;
