import PropTypes from "prop-types";

const Heading = ({ children, tag, size, color, weight, align }) => {

    const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const TagComponent = allowedTags.includes(tag) ? tag : 'h1';

    const fontSize = {
        h1: 'text-6xl', //60px
        h2: 'text-5xl', //48px
        h3: 'text-4xl', //36px
        h4: 'text-3xl', //30px
        h5: 'text-2xl', //24px
        h6: 'text-xl', //20px
    }

    const textColor = {
        white: 'text-white',
        darkGreen: 'text-darkGreen',
        grey: 'text-[#383838]'
    }

    const textWeight = {
        semibold: 'font-semibold',
        bold: 'font-bold'
    }

    const textAlign = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }

    return (
        <TagComponent className={`
        ${size ? fontSize[size] : fontSize[tag]} 
        ${textColor[color]} 
        ${textWeight[weight]}
        ${align && textAlign[align]}
        `}>
            {children}
        </TagComponent>
    );
}

export default Heading;

// 🔹 PropTypes
Heading.propTypes = {
    children: PropTypes.node.isRequired,
    tag: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]).isRequired,
    size: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
    color: PropTypes.oneOf(["darkGreen", "grey"]),
    weight: PropTypes.oneOf(["semibold", "bold"]),
    align: PropTypes.oneOf(["left", "center", "right"]),
};

// 🔹 Valores por defecto
Heading.defaultProps = {
    color: "grey",
    weight: "semibold",
};