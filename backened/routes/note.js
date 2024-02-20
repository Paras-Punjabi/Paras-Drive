const express = require("express");
const router = express.Router();
const validateUser = require("../middleware/validateUser");
const { getAllNotes, createNote, deleteNote, updateNote } = require("../controllers/note.js");

router.use(express.json());

//* Login Required in every requests

// Get All Notes using GET Request
router.get("/getallnotes", async (req, res) => {
    await getAllNotes(req,res);
});

// Create Note using POST request
router.post("/create",validateUser,async(req,res)=>{
    await createNote(req,res);
})

// Delete a note using DELETE request 
router.delete("/delete",validateUser,async(req,res)=>{
    await deleteNote(req,res);
})

// Update a note using PUT 
router.put("/update",validateUser,async(req,res)=>{
    await updateNote(req,res);
})

module.exports = router;
