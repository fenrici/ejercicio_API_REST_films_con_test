const express = require('express');
const router = express.Router();
const fetchFilm = require('../utils/fetchFilms');

// GET película por título
router.get('/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const film = await fetchFilm(title);
        
        if (!film) {
            return res.status(404).json({ message: 'Film not found' });
        }
        
        res.status(200).json(film);
    } catch (error) {
        console.error('Error al obtener película:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST crear una nueva película
router.post('/', (req, res) => {
    try {
        const film = req.body;
        
        if (!film || !film.Title) {
            return res.status(400).json({ message: 'Film data is required' });
        }
        
        res.status(200).json({ message: `Se ha guardado ${film.Title}` });
    } catch (error) {
        console.error('Error al crear película:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT actualizar una película
router.put('/', (req, res) => {
    try {
        const film = req.body;
        
        if (!film || !film.id || !film.Title) {
            return res.status(400).json({ message: 'Film ID and Title are required' });
        }
        
        res.status(200).json({ message: `Se ha actualizado ${film.Title}` });
    } catch (error) {
        console.error('Error al actualizar película:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE eliminar una película
router.delete('/', (req, res) => {
    try {
        const { id } = req.body;
        
        if (!id) {
            return res.status(400).json({ message: 'Film ID is required' });
        }
        
        res.status(200).json({ message: `Se ha borrado la película con ID: ${id}` });
    } catch (error) {
        console.error('Error al eliminar película:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 