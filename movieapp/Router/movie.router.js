const MovieModel = require("../Model/movieModel");
const express = require("express");
const router = express.Router();

// Get all movies
router.get("/", async (req, res) => {
    try {
       
        let limit = parseInt(req.query.limit) || 3;
        let page = parseInt(req.query.page) || 1;
        const name = req.query.name;

       
        if (limit <= 0) limit = 3;
        if (page <= 0) page = 1;

       
        const query = {};
        if (name) {
            query.title = name;
        }

       console.log(query)
        const skip = (page - 1) * limit;

        
        const movies = await MovieModel.find(query).skip(skip).limit(limit);

       
        res.status(200).json({ data: movies });
    } catch (error) {
        res.status(500).json({ error: error.message || error, message: "Unable to retrieve data" });
    }
});


// Get a movie by ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await MovieModel.findById(id);
        if (!movie) {
            return res.status(404).json({ message: "No movie found with this ID" });
        }
        res.status(200).json({ data: movie });
    } catch (error) {
        res.status(500).json({ error: error.message || error, message: "Unable to retrieve data for this ID" });
    }
});

// Add a new movie
router.post("/add", async (req, res) => {
    try {
        const data = req.body;
        const movie = new MovieModel(data);
        await movie.save();
        res.status(201).json({ message: "Movie added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || error, message: "Unable to add data" });
    }
});

// Update a movie by ID
router.patch("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedMovie = await MovieModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ message: "No movie found with this ID to update" });
        }
        res.status(200).json({ data: updatedMovie });
    } catch (error) {
        res.status(500).json({ error: error.message || error, message: "Unable to update data" });
    }
});

// Delete a movie by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedMovie = await MovieModel.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).json({ message: "No movie found with this ID to delete" });
        }
        res.status(200).json({ data: deletedMovie });
    } catch (error) {
        res.status(500).json({ error: error.message || error, message: "Unable to delete data" });
    }
});

module.exports = router;
