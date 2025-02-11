import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { validator } from "../middlewares/validator.js";
import {
  createNoteSchema,
  updateNoteSchema,
  pinNoteSchema,
} from "../utils/schemas.js";
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  pinNote,
  searchNote,
  deleteNote,
} from "../controllers/note.js";

const router = express.Router();

router.use(isAuth)

router.get("/get-notes", getNotes);
router.get('/get-notes/:id', getNote);
router.post('/create-note', validator(createNoteSchema), createNote)
router.patch('/update-note/:id', validator(updateNoteSchema), updateNote)
router.patch('/pin-note/:id', validator(pinNoteSchema), pinNote)
router.delete('/delete-note/:id', deleteNote)

router.get('/search-note', searchNote)

export default router;
