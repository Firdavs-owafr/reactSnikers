import React, { useContext } from 'react'
import StoryContext from '../../context';

const Info = ( { image,title,description } ) => {

  const { setCardOpened } = useContext(StoryContext)

  return (
    <div className='notfound__box'>
        <img src={image} width={'120px'} alt="Empty" />
        <h2>{title}</h2>
        <p>{description}</p>
        <button  onClick={() => setCardOpened(false)}  className="greenBtnBack">  <img src="/img/arraw.svg" alt="Arraw" />  Вернуться назад </button>
    </div> 
  )
}

export default Info;