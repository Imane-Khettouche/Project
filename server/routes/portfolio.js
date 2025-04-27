import express from "express";
import portfolio from "../models/Portfolio.js";

const PortfolioRouter = express.Router();
//GET
PortfolioRouter.get("/", async (req, res) => {
  try {
    const portfolios = await portfolio.findAll();
    res.status(200).json(portfolios);
  } catch (error) {
    console.error("Error fetching portfolios :", error);
    res
      .status(500)
      .json({message: "Internal server error", error: error.message});
  }
});
// GET one portfolio by userId (userDataId)
PortfolioRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userPortfolio = await portfolio.findOne({
      where: { userDataId: userId },
    });

    if (!userPortfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.status(200).json(userPortfolio);
  } catch (error) {
    console.error("Error fetching user portfolio:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Create a new portfolio
PortfolioRouter.post("/", async (req, res) => {
  try {
    console.log("sending data:", req.body);
    const {
      idPortfolio,
      privateSection,
      nickname,
      skills,
      challenges,
      socialLinks,
    } = req.body;

    // Check if required fields are missing
    if (
      !idPortfolio ||
      !privateSection ||
      !nickname ||
      !skills ||
      !socialLinks ||
      !challenges
    ) {
      return res.status(400).json({message: "All fields are required!"});
    }

    // Create the portfolio
    const newPortfolio = await portfolio.create(req.body);

    // ✅ Return success message + created challenge
    res.status(201).json({
      message: "Challenge created successfully",
      challenge: newPortfolio,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({message: "Validation error", errors});
    } else {
      console.error("Error creating portfolio:", error);
      res
        .status(400)
        .json({message: "Failed to create portfolio", error: error.message});
    }
  }
});
// Update an existing portfolio
PortfolioRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get portfolio ID from URL params
    const {
      privateSection,
      nickname,
      skills,
      challenges,
      socialLinks,
    } = req.body;

    // Check if required fields are provided
    if (!privateSection || !nickname || !skills || !socialLinks || !challenges) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Retrieve the existing portfolio
    const existingPortfolio = await portfolio.findByPk(id);
    if (!existingPortfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // If skills and socialLinks are strings, parse them as JSON
    if (typeof skills === 'string') {
      try {
        req.body.skills = JSON.parse(skills);
      } catch (error) {
        return res.status(400).json({ message: "Invalid skills format", error: error.message });
      }
    }

    if (typeof socialLinks === 'string') {
      try {
        req.body.socialLinks = JSON.parse(socialLinks);
      } catch (error) {
        return res.status(400).json({ message: "Invalid socialLinks format", error: error.message });
      }
    }

    // Update the portfolio with the new data
    await existingPortfolio.update({
      privateSection,
      nickname,
      skills,
      challenges,
      socialLinks,
    });

    res.status(200).json({
      message: "Portfolio updated successfully",
      portfolio: existingPortfolio,
    });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


export default PortfolioRouter;
