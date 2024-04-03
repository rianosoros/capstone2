const express = require('express');
const router = express.Router();
const InteractionLog = require('../models/InteractionLog');

// Log an interaction
router.post('/log-interaction', async (req, res) => {
  try {
    const { interactionType, effectOnHunger, effectOnHappiness, effectOnHealth } = req.body;
    const newInteractionLog = await InteractionLog.create({
      interactionType,
      effectOnHunger,
      effectOnHappiness,
      effectOnHealth,
    });
    res.status(201).json({ message: 'Interaction logged successfully', interactionLog: newInteractionLog });
  } catch (error) {
    console.error('Error logging interaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all interaction logs
router.get('/interaction-logs', async (req, res) => {
    try {
        const interactionLogs = await InteractionLog.findAll();
        res.json({ interactionLogs });
    } catch (error) {
        console.error('Error getting interaction logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    });

// Get a specific interaction log
router.get('/interaction-logs/:id', async (req, res) => {
    try {
        const interactionLog = await InteractionLog.findByPk(req.params.id);
        if (!interactionLog) {
            return res.status(404).json({ error: 'Interaction log not found' });
        }
        res.json({ interactionLog });
    } catch (error) {
        console.error('Error getting interaction log:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    }
);

// Update an interaction log
router.patch('/interaction-logs/:id', async (req, res) => {
    try {
        const { interactionType, effectOnHunger, effectOnHappiness, effectOnHealth } = req.body;
        const interactionLog = await InteractionLog.findByPk(req.params.id);
        if (!interactionLog) {
            return res.status(404).json({ error: 'Interaction log not found' });
        }
        interactionLog.interactionType = interactionType;
        interactionLog.effectOnHunger = effectOnHunger;
        interactionLog.effectOnHappiness = effectOnHappiness;
        interactionLog.effectOnHealth = effectOnHealth;
        await interactionLog.save();
        res.json({ message: 'Interaction log updated successfully', interactionLog });
    } catch (error) {
        console.error('Error updating interaction log:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    }
);

// Delete an interaction log
router.delete('/interaction-logs/:id', async (req, res) => {
    try {
        const interactionLog = await InteractionLog.findByPk(req.params.id);
        if (!interactionLog) {
            return res.status(404).json({ error: 'Interaction log not found' });
        }
        await interactionLog.destroy();
        res.json({ message: 'Interaction log deleted successfully' });
    } catch (error) {
        console.error('Error deleting interaction log:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    }
);


module.exports = router;
