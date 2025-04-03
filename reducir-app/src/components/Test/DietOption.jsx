import PropTypes from 'prop-types';

export const DietOption = ({
    id,
    label,
    value,
    selected,
    onClick
}) => {
    return (
        <div
            key={id}
            onClick={() => onClick(id, value)}
            className={`cursor-pointer border rounded-xl p-4 flex justify-center items-center ${selected ? 'borderGreen text-white backgroundDarkGreen font-semibold' : 'border-gray-300 bg-white'}`}
        >
            <p className={`text-center ${selected ? ' text-white' : ''}`}>{label}</p>
        </div>
    )
};

DietOption.propTypes = {
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}
