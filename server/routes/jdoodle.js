// routes/SolutionRouter.js
import express from 'express';
import Solution from '../models/Solution.js';
import Challenge from '../models/Challenge.js';
import User from '../models/User.js';

const router = express.Router();

// ✅ حفظ حل الطالب (POST)
router.post('/:studentId/:challengeId', async (req, res) => {
  const { studentId, challengeId } = req.params;
  const { solutionContent } = req.body;

  try {
    const solution = await Solution.create({
      studentId,
      challengeId,
      solutionContent,
      status: 'submitted',
    });

    res.status(201).json({ message: 'Solution submitted successfully', solution });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting solution', error: error.message });
  }
});

// ✅ جلب جميع الحلول لتحدي معين نُشر من طرف أستاذ معين (GET)
router.get('/:professorId/:challengeId', async (req, res) => {
  const { professorId, challengeId } = req.params;

  try {
    const challenge = await Challenge.findOne({ where: { id: challengeId, professorId } });

    if (!challenge) return res.status(404).json({ message: 'Challenge not found or not authorized' });

    const solutions = await Solution.findAll({
      where: { challengeId },
      include: [{ model: User, attributes: ['username', 'email'] }],
    });

    res.status(200).json(solutions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching solutions', error: error.message });
  }
});

export default router;
