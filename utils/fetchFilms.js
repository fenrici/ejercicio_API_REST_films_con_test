require('dotenv').config();
const fetch = require('node-fetch');

/**
 * Obtiene datos de películas desde la API de OMDB por título
 */
async function fetchFilm(title) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${process.env.API_KEY}`);
        const data = await response.json();
        
        if (data.Response === 'False') {
            return null;
        }
        
        return data;
    } catch (error) {
        console.error('Error al obtener película:', error);
        return null;
    }
}

module.exports = fetchFilm; 