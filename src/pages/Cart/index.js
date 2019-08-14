import React from 'react';
import { MdDelete, MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md'
import { Container, ProductTable, Total } from './styles';
import { useSelector, useDispatch } from 'react-redux'
import { formatPrice } from '../../util/format'

import * as CartActions from '../../store/modules/cart/actions'

export default function Cart() {

  const total = useSelector(state => formatPrice(state.cart.reduce((totalV, item) => {
    return totalV + item.price * item.amount;
  }, 0)
  ))

  const cart = useSelector(state => state.cart.map(item => ({
    ...item,
    subTotal: formatPrice(item.price * item.amount)

  })))

  const dispatch = useDispatch()
  function increment(item) {
    dispatch(CartActions.updateAmountRequest(item.id, item.amount + 1))

  }
  function decremente(item) {
    dispatch(CartActions.updateAmountRequest(item.id, item.amount - 1))

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
                  dispatch(CartActions.removeFromcart(item.id))

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

