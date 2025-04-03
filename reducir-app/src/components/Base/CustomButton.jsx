import { Button } from "@nextui-org/react"
import PropTypes from 'prop-types'

const styles = {
    filled: 'backgroundDarkGreen text-white',
    white: 'bg-white textDarkGreen'
}

export default function CustomButton({ variant = "filled", type, children, isDisabled = false, isOpacity = false, fullWidth = false }) {
    return (
        <Button
            type={type}
            className={`shadow ${fullWidth && 'w-full'} ${styles[variant]} ${isOpacity && 'opacity-70'}`}
            disabled={isDisabled}
        >
            {children}
        </Button>
    )
}

CustomButton.propTypes = {
    variant: PropTypes.oneOf(["filled", "white"]),
    type: PropTypes.string.isRequired,
    children: PropTypes.node,
    isDisabled: PropTypes.bool,
    isOpacity: PropTypes.bool,
    fullWidth: PropTypes.bool,
}