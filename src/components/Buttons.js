import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityState: props.quantity,
      total: props.price * props.quantity,
      disabled: false,
    };
  }

  handleAddition = ({target}) => {
    const {price, arr, handleFinalPrice} = this.props;
    const {quantityState} = this.state;
    this.setState((prevState) => ({
      quantityState: prevState.quantityState + 1,
      total: prevState.total + price,
    }));

    const {id} = target.parentElement.parentElement;
    const itemFromCart = arr.find((item) => item.productId === id);

    if (itemFromCart.ProductAvailability - 1 === quantityState) {
      this.setState({disabled: true});
    } else {
      this.setState({disabled: false});
    }

    itemFromCart.quantity = quantityState + 1;
    if (itemFromCart.quantity === 0) {
      itemFromCart.quantity = 1;
    }
    localStorage.setItem('cart', JSON.stringify(arr));

    handleFinalPrice();
  };

  handleSubtraction = ({target}) => {
    const {quantityState} = this.state;
    const {price, arr, handleFinalPrice} = this.props;

    if (quantityState > 1) {
      this.setState((prevState) => ({
        quantityState: prevState.quantityState - 1,
        total: prevState.total - price,
      }));
    }

    const {id} = target.parentElement.parentElement;
    const itemFromCart = arr.find((item) => item.productId === id);

    if (itemFromCart.ProductAvailability - 1 === quantityState) {
      this.setState({disabled: true});
    } else {
      this.setState({disabled: false});
    }

    itemFromCart.quantity = quantityState - 1;
    if (itemFromCart.quantity === 0) {
      itemFromCart.quantity = 1;
    }
    localStorage.setItem('cart', JSON.stringify(arr));

    handleFinalPrice();
  };

  handleDelete = ({target}) => {
    const {handleFinalPrice} = this.props;
    const LocalStorageCartItem = JSON.parse(localStorage.getItem('cart')) || [];
    const {id} = target.parentElement.parentElement;
    const newLocalStorageCartItem = LocalStorageCartItem.filter(
      (item) => item.productId !== id
    );
    localStorage.setItem('cart', JSON.stringify(newLocalStorageCartItem));
    target.parentElement.parentElement.remove();

    handleFinalPrice();
  };

  render() {
    const {quantityState, total, disabled} = this.state;
    return (
      <div className="flexx">
        <button
          type="button"
          onClick={this.handleSubtraction}
          data-testid="product-decrease-quantity"
          className="button"
        >
          -
        </button>
        <p data-testid="shopping-cart-product-quantity">{quantityState}</p>
        <button
          type="button"
          onClick={this.handleAddition}
          data-testid="product-increase-quantity"
          disabled={disabled}
          className="button"
        >
          +
        </button>
        <p>{total.toFixed(2)}</p>
        <button className="button" type="button" onClick={this.handleDelete}>
          X
        </button>
      </div>
    );
  }
}

Buttons.propTypes = {
  quantity: PropTypes.number,
  total: PropTypes.number,
}.isRequired;
