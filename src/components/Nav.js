import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CartIcon from './CartIcon';

export default class Nav extends Component {
  render() {
    const {quantityOfItemsInCart} = this.props;
    return (
      <nav>
        <Link to="/online-store">
          <h1>Online Store</h1>
        </Link>
        <CartIcon quantity={quantityOfItemsInCart} />
      </nav>
    );
  }
}
