import React, { Component } from 'react';
import { MdAddShoppingCart } from 'react-icons/md'

import api from '../../services/api'
import { connect } from 'react-redux'
import { formatPrice } from '../../util/format'
import { bindActionCreators } from 'redux'
import * as CartActions from '../../store/modules/cart/actions'

import { ProductList } from './styles';

class Home extends Component {
  state = {
    product: [],
  }
  handleAdddProduct = id => {
    const { addTocartRequest } = this.props
    addTocartRequest(id)
  }
  async componentDidMount() {
    const response = await api.get("products");
    const data = response.data.map(item => ({
      ...item, priceFormtted: formatPrice(item.price)
    }))
    this.setState({ product: data })

  }
  render() {
    const { amount } = this.props
    const { product } = this.state
    return (
      <ProductList>
        {product.map(item => (
          <li>
            <img
              src={item.image}
              alt={item.title} />
            <strong>{item.title} </strong>
            <span>{item.priceFormtted} </span>
            <button type="button" onClick={() => this.handleAdddProduct(item.id)}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
                {amount[item.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
        ￼


      </ProductList>
    );
  }
}
const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount
    return amount
  }, {})
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home)