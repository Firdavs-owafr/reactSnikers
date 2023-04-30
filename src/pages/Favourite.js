import { React,useContext } from 'react'
import Card from '../components/Card'
import  StoryContext from '../context'

export default function Favourite({onDeleteFavourites}){

  const {favourite} = useContext(StoryContext);
  
  // console.log(state);

  return (
    <div className="content p-40">
    <div className="d-flex align-center mb-40">
            <img src="/img/back.png" alt="" className='back' />
            <h1>Мои закладки</h1>
    </div>
    <div className="d-flex flex-wrap">
    {favourite.map((item,index) => {
            return <Card 
                key={index}
                title={item.title}
                price={item.price}
                imgUrl={item.imgUrl}    
                isLiked={true}
                onFavourite={() => onDeleteFavourites(item.id)}
            />
        })}
    </div>
</div>
  )
}
