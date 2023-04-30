import React, { useContext, useState } from 'react'
import Info from './Card/Info'
import StoryContext from '../context'
import axios from 'axios'

const delay = (sec) => new Promise((resolve) => setTimeout(resolve,sec) )


export default function Drawer({onclose,items,onRemoveItem}) {

  const { cartitems,setCartItems   } = useContext(StoryContext)

  const [isOrderCompleted, setIsOrderCompleted] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const [isLoading, setIsLoading] = useState(false)


  const onClickIsOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('https://641c553b1a68dc9e4606be3e.mockapi.io/orders',{
        items: cartitems
      })
      
      setOrderId(data.id)
      setIsOrderCompleted(true)
      setCartItems([])
      
      for (let index = 0; index < cartitems.length; index++) {
        const element = cartitems[index];
        axios.delete('https://641acbc49b82ded29d41eaa8.mockapi.io/cart/' + element.id)
        await delay(1000)
      }

      
      
    } catch (error) {
      alert('Error')
    }
    setIsLoading(false)
  } 

  // axios.delete('https://641c553b1a68dc9e4606be3e.mockapi.io/orders/10')
  
  return (
    <div className="overlay"  >
            <div className="drawer">
                  <h2 className="d-flex justify-between  mb-30">Корзина  

                        <img  onClick={onclose} className="cu-p" src="/img/remove.svg" alt="remove"/>

                   </h2>
                    {items.length > 0 ? <>
                      <div className="items ">
                    {items.map((item,inde) => {
                        return  <div key={inde} className="cartItem d-flex align-center mb-20">
                      <div style={{backgroundImage: `url(${item.imgUrl})` }} className="cartItemImg"></div>
                        <div className="mr-20 flex">
                          <p className="mb-5">{item.name}</p>
                          <b>{item.price} руб.</b>      
                          </div>
                          <img  onClick={ () => onRemoveItem(item.id) } className="cartItemBtn" src="/img/remove.svg" alt="remove" />
                      </div>
                    })}
                    
                        </div> 
                      <div className="cardTotalBlock">
                        <ul>
                          <li>
                              <span>Итого: </span>
                              <div></div>  
                              <b>21 498 руб. </b>
                          </li>
                          <li>
                              <span>Налог 5%:</span>
                              <div></div>  
                              <b>1074 руб. </b>
                          </li>
                        </ul>
                            <button className="greenBtn" disabled={isLoading} onClick={onClickIsOrder  } >Оформить заказ  <img src="/img/arraw.svg" alt="Arraw" />  </button>
                        </div>
                    </>  : <Info 
                                title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая' } 
                                description={ isOrderCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
                                image={ isOrderCompleted ? "/img/framed.png" : "/img/box-notfound.jpg" }
                            />
                 }
            </div>
        </div>
  )
}
