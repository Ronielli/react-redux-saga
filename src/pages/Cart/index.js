import React from 'react';
import { MdDelete, MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md'
import { Container, ProductTable, Total } from './styles';
import { connect } from 'react-redux'
import { formatPrice } from '../../util/format'
import { bindActionCreators } from 'redux'
import * as CartActions from '../../store/modules/cart/actions'
function Cart({ cart, removeFromcart, updateAmountRequest, total }) {
  function increment(item) {
    updateAmountRequest(item.id, item.amount + 1)

  }
  function decremente(item) {
    updateAmountRequest(item.id, item.amount - 1)

  }
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr>
              <td>
                <img src={item.image}
                  alt={item.title} />
              </td>
              <td>
                <strong>{item.title}</strong>
                <span>{item.priceFormtted}</span>
              </td>
              <td>
                <div>
                  <button type='button' onClick={() => decremente(item)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={item.amount} />
                  <button type='button' onClick={() => increment(item)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{item.subTotal}</strong>
              </td>
              <td>
                <button type='button' onClick={() => {
                  removeFromcart(item.id)
                }}>
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type='button'> Finalizar Pedido</button>
        <Total>
          <span> TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
const mapStateToProps = state => ({
  cart: state.cart.map(item => ({
    ...item,
    subTotal: formatPrice(item.price * item.amount)

  })),
  total: formatPrice(state.cart.reduce((total, item) => {
    return total + item.price * item.amount;
  }, 0))
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Cart)