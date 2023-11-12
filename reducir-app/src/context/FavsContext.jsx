import React, { createContext, useState, useContext } from "react";


const FavsContext = createContext([]);
export const useFavContext = () => useContext(FavsContext);

const FavsProvider = ({ children }) => {
    const [fav, setFav] = useState([]);

    const addAction = (item) => {
        const newFav = fav.filter(action => action.id !== item.id);
        newFav.push({...item});
        setFav(newFav);
    }
    console.log(fav);
    const clearFav = () => setFav([]);
    
    const isInFavs = (id) => {
        return fav.find(action => action.id === id) ? true : false;
    }

    const removeFav = (id) => setFav(fav.filter(action => action.id !== id));
    return (
        <FavsContext.Provider value={{
            clearFav,
            isInFavs,
            removeFav,
            addAction
        }}>
           { children } 
        </FavsContext.Provider>
    )
}

export default FavsProvider;