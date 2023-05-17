import PropTypes from 'prop-types';
import { ButtonLoadMore } from './ButtonLoadMore.styled';

export const Button = ({ children, onClick }) => (
    <ButtonLoadMore type='button' onClick = {onClick}>
        {children}
    </ButtonLoadMore>
)

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
};