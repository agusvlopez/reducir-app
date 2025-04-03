import bike from "../covers/icons/bike-icon.png";
import car from "../covers/icons/car-icon.png";
import train from "../covers/icons/train-icon.png";
import bus from "../covers/icons/bus-icon.png";
import subway from "../covers/icons/subway-icon.png";
import walk from "../covers/icons/walk-icon.png";
import motorbike from "../covers/icons/motorbike-icon.png";
import taxi from "../covers/icons/taxi-icon.png";

export const TRANSPORT_OPTIONS = [
    { id: 1, label: "Bici", imageUrl: bike, value: 0.1 },
    { id: 2, label: 'Auto', imageUrl: car, value: 7 },
    { id: 3, label: 'Taxi', imageUrl: taxi, value: 6 },
    { id: 4, label: 'Colectivo', imageUrl: bus, value: 5 },
    { id: 5, label: 'Tren', imageUrl: train, value: 2 },
    { id: 6, label: 'Subte', imageUrl: subway, value: 3 },
    { id: 7, label: 'Moto', imageUrl: motorbike, value: 4 },
    { id: 8, label: 'A pie', imageUrl: walk, value: 0.1 },
];

export const DIET_OPTIONS = [
    { id: 1, label: "Vegana", value: 3 },
    { id: 2, label: 'Vegetariana', value: 4 },
    { id: 3, label: 'Piscívora', value: 4 },
    { id: 4, label: 'Baja en carne', value: 5 },
    { id: 5, label: 'Moderada en carne', value: 6 },
    { id: 6, label: 'Alta en carne', value: 8 }
];