import express from "express";
import quote from "../models/Quote.js";

const QuoteRouter = express.Router();
//POST
QuoteRouter.post("/", async (req, res) => {
  const {quoteDes, owner} = req.body;
  console.log("📥 Incoming Quote Data:", req.body);
  try {
    if (!quoteDes || !owner) {
      // Use quoteDes for validation
      return res.status(400).json({message: "Quote and owner are required"});
    }
    const newQuote = await quote.create({
      quoteDes,
      owner,
    });

    res
      .status(201)
      .json({message: "Quote created successfully", quote: newQuote});
  } catch (error) {
    console.error("Error creating quote:", error);
    res
      .status(500)
      .json({message: "Internal server error", error: error.message});
  }
});
// GET route for fetching all quotes
QuoteRouter.get("/", async (req, res) => {
  try {
    const quotes = await quote.findAll();
    res.status(200).json(quotes); // Send the quotes as JSON
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res
      .status(500)
      .json({message: "Internal server error", error: error.message});
  }
});

//delete quotes
QuoteRouter.delete("/:id", async (req, res) => {
  const QuoteId = parseInt(req.params.id, 10);

  if (isNaN(QuoteId)) {
    return res.status(400).json({message: "Invalid Quote ID"});
  }

  try {
    const deletedQuote = await quote.destroy({
      where: {id: QuoteId},
    });

    if (deletedQuote) {
      res.json({message: "Quote deleted successfully"});
    } else {
      res.status(404).json({message: "Quote not found"});
    }
  } catch (error) {
    console.error("❌ Error deleting Quote:", error);
    res.status(500).json({
      message: "Error deleting Quote",
      error: error.message,
    });
  }
});

export default QuoteRouter;
