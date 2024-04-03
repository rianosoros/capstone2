const InteractionLog = require('../models/InteractionLog');

const logInteraction = async (req, res, next) => {
  try {
    const { interactionType, effectOnHunger, effectOnHappiness, effectOnHealth } = req.body;
    await InteractionLog.create({
      interactionType,
      effectOnHunger,
      effectOnHappiness,
      effectOnHealth,
      userId: req.user.id, // Assuming userId is available in req.user
    });
    next();
  } catch (error) {
    console.error('Error logging interaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { logInteraction };
