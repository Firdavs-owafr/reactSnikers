import React,{useEffect, useState} from "react";
import { Routes,Route } from "react-router-dom";
import axios from "axios";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favourite from "./pages/Favourite";
import StoryContext from "./context";

function App() {
  
  const [items,setItems] = useState([])
  const [cartitems,setCartItems] = useState([])
  const [favourite,setFavourite] = useState([])
  const [searchInput,setSearchInput] = useState('')
  const [cardOpened, setCardOpened] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchData(){
      const itemsResponse = await axios.get('https://641acbc49b82ded29d41eaa8.mockapi.io/items')
      const cartResponse = await axios.get('https://641acbc49b82ded29d41eaa8.mockapi.io/cart')
      const favouriteResponse = await axios.get('https://641c553b1a68dc9e4606be3e.mockapi.io/favourite')

      setIsLoading(false)

      setItems(itemsResponse.data);
      setCartItems(cartResponse.data); 
      setFavourite(favouriteResponse.data); 
    }

    fetchData()    
  },[] )


// axios.delete('https://641c553b1a68dc9e4606be3e.mockapi.io/favourite/3' )
  
  const onAddToCart = (obj) => {
    // try{
      if(cartitems.find((favObj) => Number(favObj.id) === Number(obj.id) )){
        axios.delete('https://641acbc49b82ded29d41eaa8.mockapi.io/cart/' + obj.id)
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))

      } else {
        axios.post('https://641acbc49b82ded29d41eaa8.mockapi.io/cart',obj)
        setCartItems([...cartitems,obj])
      }
    // } catch (error) {

    // }
  }

  const onRemoveItem = (id) => {
    axios.delete('https://641acbc49b82ded29d41eaa8.mockapi.io/cart/' + id)
    setCartItems((pre) => pre.filter((ite) => ite.id !== id ))
  }

  const onAddToFavourites = (obj) => {    
    
    axios.post('https://641c553b1a68dc9e4606be3e.mockapi.io/favourite',obj)
    setFavourite([...cartitems,obj])
    
  }

  const onDeleteFavourites = async (id) => {    
    
    try {
      await axios.delete('https://641c553b1a68dc9e4606be3e.mockapi.io/favourite/' + id)
      setFavourite((pre) => pre.filter((item) => item.id !== id ) )

    } catch(error) {
      alert('Error')
    } 

  }

  const isItemsAdded = (id) => {
    return cartitems.some(obj => Number(obj.id) === Number(id))
  }

  const onChangeInput = (e) => {
    setSearchInput(e.target.value)
  }
  return (
    <StoryContext.Provider value={ { items,cartitems,favourite, isItemsAdded,setCardOpened ,setCartItems } }>
      <div className="wrapper clear">
      {cardOpened && <Drawer  items={cartitems}  onclose={() => setCardOpened(false)}  onRemoveItem={onRemoveItem} />}  
      <Header onClickCart={() => setCardOpened(true) }    />
        <Routes>
            <Route path='/' element={
                <Home
                    items={items}
                    cartitems={cartitems}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    onChangeInput={onChangeInput}
                    onAddToFavourites={onAddToFavourites}
                    onAddToCart={onAddToCart}
                    isLoading={isLoading}
                />
            }/>
            <Route path='/favourites' element={<Favourite 
                // favourite={favourite}
                onDeleteFavourites={onDeleteFavourites}
            />}/>
        </Routes>
    </div>
    </StoryContext.Provider>
  );
}

export default App;
