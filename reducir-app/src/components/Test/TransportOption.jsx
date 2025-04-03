import PropTypes from 'prop-types';

export const TransportOption = ({
    id,
    label,
    imageUrl,
    value,
    selected,
    onClick
}) => {
    return (
        <div
            key={id}
            onClick={() => onClick(id, value)}
            className={`cursor-pointer border rounded-xl p-4 font-semibold ${selected ? 'borderGreen' : 'border-gray-300 bg-white'}`}
        >
            <div className="flex items-center flex-col">
                <img src={imageUrl} alt={label} className="mb-2 h-18 w-18 object-contain" />
                <p className="text-center">{label}</p>
            </div>
        </div>
    );
}

TransportOption.propTypes = {
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    value: PropTypes.string,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}
