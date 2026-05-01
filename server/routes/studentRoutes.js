const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// GET all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        console.error("GET ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});

// ADD student
router.post("/", async (req, res) => {
    try {
        console.log("BODY:", req.body); // 👈 ADD THIS

        const student = new Student(req.body);
        await student.save();

        res.json(student);
    } catch (err) {
        console.error("POST ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});

// UPDATE student
router.put("/:id", async (req, res) => {
    try {
        const updated = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE student
router.delete("/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;