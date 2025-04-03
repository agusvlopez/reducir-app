import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { ArrowRight } from '../Icons/ArrowRight';
import DefaultImage from '../../covers/default-image.jpg';


export function ActionCard({ fav }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div
            className="backgroundDarkGreen rounded-lg shadow-xl flex flex-col items-center my-8 w-28 h-40 md:w-48 lg:w-56 lg:h-72 ">
            <img
                src={isLoaded ? fav.image : DefaultImage}
                alt={isLoaded ? fav.alt : "Imagen por defecto"}
                className={`rounded-tl-lg rounded-tr-lg object-cover ${isLoaded ? "" : "animate-pulse"}`}
                onLoad={() => setIsLoaded(true)}
                onError={(e) => {
                    e.target.src = DefaultImage;
                }}
            />
            <div className="px-4 m-2 text-white w-full h-full flex items-center justify-between">
                <h3 className="text-xs lg:text-base line-clamp-2">{fav.title}</h3>
                <Link to={`/accion/${fav._id}`}>
                    <ArrowRight width={20} height={20} />
                </Link>
            </div>
        </div>
    )
}

ActionCard.propTypes = {
    fav: PropTypes.object.isRequired
}