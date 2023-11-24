// // controllers/favoriteController.js

// const FavoritesService = require('../services/favorites.js');
// //const { setFavorites, setLoading } = require('../redux/favoriteSlice'); // Importa tus acciones y estado de Redux

// const getFavorites = async (req, res) => {
// const userId = req.params.userId;
//   try {
//     //setLoading(true);
    
//     const favorites = await FavoritesService.getFavoritesByUserId(userId);
//     return res.status(201).json({favorites});
//     // Actualiza el estado de Redux con los favoritos obtenidos
//     //setFavorites(favorites);

//     //setLoading(false);
//   } catch (error) {
//     console.error('Error al obtener los favoritos:', error);
//     res.status(500).json({ error: 'Error interno del servidor:' + error });
//   } 
// //   finally {
// //     setLoading(false);
// //   }
//};

module.exports = {
  getFavorites,
};