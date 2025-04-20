require('dotenv').config();
const express = require('express');
const filmsRoutes = require('./routes/films');

// Inicializar la aplicación
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/film', filmsRoutes);

// Manejador para rutas no definidas (404)
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server error' });
});

// Iniciar el servidor si no está en modo de prueba
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
}

// Exportar la aplicación para pruebas
module.exports = app;
