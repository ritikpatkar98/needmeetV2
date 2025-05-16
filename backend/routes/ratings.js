const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// File paths
const ratingsFile = path.join(__dirname, '../data/ratings.json');
const providersFile = path.join(__dirname, '../data/providers.json');

// Utility function to load data from files
const loadData = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Add a rating
router.post('/', (req, res) => {
    try {
        const { userId, providerId, rating, comment } = req.body;

        // Input validation
        if (!userId || !providerId || !rating || !comment) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const ratings = loadData(ratingsFile);
        const providers = loadData(providersFile);

        // Add new rating
        const newRating = {
            id: Date.now().toString(),
            userId,
            providerId,
            rating,
            comment,
            createdAt: new Date().toISOString()
        };
        ratings.push(newRating);

        // Find and update the provider's rating
        const provider = providers.find(p => p.id === providerId);
        if (provider) {
            const providerRatings = ratings.filter(r => r.providerId === providerId);
            const avgRating = providerRatings.reduce((acc, r) => acc + r.rating, 0) / providerRatings.length;
            provider.rating = avgRating;
            provider.totalRatings = providerRatings.length;
        }

        // Save updated data back to the files
        fs.writeFileSync(ratingsFile, JSON.stringify(ratings, null, 2));
        fs.writeFileSync(providersFile, JSON.stringify(providers, null, 2));

        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({ message: 'Error adding rating', error: error.message });
    }
});

// Get provider ratings
router.get('/provider/:providerId', (req, res) => {
    try {
        const ratings = loadData(ratingsFile);
        const providerRatings = ratings.filter(r => r.providerId === req.params.providerId);

        if (!providerRatings.length) {
            return res.status(404).json({ message: 'No ratings found for this provider' });
        }

        res.json(providerRatings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ratings', error: error.message });
    }
});

module.exports = router;
