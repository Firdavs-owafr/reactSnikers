import React from 'react'
import Card from '../components/Card'

export default function Home( { items,searchInput,setSearchInput,onChangeInput,onAddToFavourites,onAddToCart,isLoading } ){
    

    const loadingFunction = () => {
        const itemm = items.filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase()))
        return (isLoading ? [...Array(8)] : itemm).map((item,index) => {
            return <Card 
                onFavourite={(obj) => onAddToFavourites(obj)}
                onPlus={() => onAddToCart(item) }
                key={index}
                // added={isItemsAdded(item && item.id)}
                loading={isLoading}
                {...item}
            />
        })

    } 

 
  return (
    <div className="content p-40">
    <div className="d-flex align-center justify-between mb-40">
            <h1>{searchInput ? `Поиск по запросу: "${searchInput}"`  : 'Все кроссовки' }</h1>
            <div className="search-block d-flex">
                <img src="/img/search.svg" alt="search" />
                {searchInput && <img onClick={() => setSearchInput('') } className="clear cu-p" src="/img/remove.svg" alt="remove" /> }
                <input  placeholder="Поиск..."  onChange={onChangeInput}  value={searchInput}  />
            </div>
    </div>
    <div className="d-flex flex-wrap">
        {loadingFunction()}
    </div>
</div>
  )
}
