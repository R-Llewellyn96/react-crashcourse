import PropTypes from 'prop-types'


const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            className='btn'
            style={{ backgroundColor: props.color}}>
            {props.text}
        </button>
    )
}

Button.defaultProps = {
    color: 'RoyalBlue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

export default Button
