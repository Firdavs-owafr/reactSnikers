import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import StoryContext from '../context';

export default function Header({onClickCart}) {

  const { cartitems } = useContext(StoryContext)

  const totalPrice = cartitems.reduce((sum,obj) => obj.price + sum,0 );

  return (
    <header className="d-flex justify-between align-center p-40">
            <Link to='/'>

            <div className="d-flex align-center">
              	<img width={40} height={40} src="/img/logo.png" alt="logo" />
            <div>
              <h3 className="text-uppercase">React Snikers</h3>
              <p className="opacity-5">Магазин лучших кроссовок</p>
            </div>
            </div>
              </Link>

            <ul className="d-flex">
                <li onClick={onClickCart} className="mr-30 cu-p">
                  <img  width={18} height={18} src="/img/card.svg" alt="Korzina" />
                  <span>{totalPrice} руб.</span>
                </li>
                <li className="mr-10 cu-p">
                      <Link to='/favourites'>
                          <img src="/img/favorite.svg" alt="Zakladkii" />
                      </Link>
                </li>
                <li>
                      <img src="/img/person.svg" alt="Polzovatel" />
                </li>
            </ul>
        </header>
  )
}
