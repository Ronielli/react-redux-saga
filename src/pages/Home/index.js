import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md'
import api from '../../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { formatPrice } from '../../util/format'
import * as CartActions from '../../store/modules/cart/actions'

import { ProductList } from './styles';

export default function Home({ addTocartRequest }) {
  const dispatch = useDispatch()
  const amount = useSelector(state =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount
      return amount
    }, {})



  )
  const [product, setProduct] = useState([])
  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("products");
      const data = response.data.map(item => ({
        ...item, priceFormtted: formatPrice(item.price)
      }))
      setProduct(data)
    }
    loadProducts();
  }, [])


  function handleAdddProduct(id) {
    dispatch(CartActions.addTocartRequest(id))
  }



  return (
    <ProductList>
      {product.map(item => (
        <li>
          <img
            src={item.image}
            alt={item.title} />
          <strong>{item.title} </strong>
          <span>{item.priceFormtted} </span>
          <button type="button" onClick={() => handleAdddProduct(item.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />
              {amount[item.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}  ￼
      </ProductList>
  )
}


