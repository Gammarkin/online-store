import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class CartIcon extends React.Component {
  render() {
    const {quantity} = this.props;
    return (
      <Link to="/shopcart" data-testid="shopping-cart-button">
        <div className="shop_cart_icon">
          <img
            src="https://svgsilh.com/svg/294547.svg"
            alt="carrindo-compras"
            className="carrinho-img"
          />
          <span className="spanText" data-testid="shopping-cart-size">
            {quantity}
          </span>
        </div>
      </Link>
    );
  }
}

CartIcon.propTypes = {
  quantity: PropTypes.number,
}.isRequired;
