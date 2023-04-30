import React,{useState,useContext} from 'react'
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader"
import StoryContext from '../../context'

export default function Card(
  { id,
    name,
    price,
    imgUrl,
    onFavourite,
    onPlus,
    isLiked = false,
    loading = false 
  }){

  const { isItemsAdded } = useContext(StoryContext)

  const [isFavourite, setIsFavourite] = useState(isLiked)

  const onClickPlus = () => {
    onPlus( { id,name,price,imgUrl } )
    // setIsAdded(!isAdded)
  }
 
  const onClickFavourite = () => {
    onFavourite({name,price,imgUrl })
    setIsFavourite(!isFavourite)
  }

  return (
        <div className={styles.card}>
          {
            loading ?  <ContentLoader 
            speed={2}
            width={160}
            height={260}
            viewBox="0 0 150 260"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="105" y="76" rx="0" ry="0" width="1" height="2" /> 
            <rect x="0" y="0" rx="10" ry="10" width="150" height="155" /> 
            <rect x="0" y="175" rx="3" ry="3" width="150" height="15" /> 
            <rect x="0" y="196" rx="3" ry="3" width="95" height="15" /> 
            <rect x="0" y="230" rx="3" ry="3" width="80" height="26" /> 
            <rect x="116" y="224" rx="3" ry="3" width="32" height="32" />
          </ContentLoader> : <>
                    <div className={styles.favorite} onClick={onFavourite} >
                            
                            <img onClick={onClickFavourite} src={isFavourite ? "/img/layk-red.svg" :  "/img/layk.svg"} alt="layk" />
                        </div>
                        <img width={'100%'} height={130} src={imgUrl} alt="sneakers" />
                        <p>{name} </p>
                        <div className="d-flex justify-between align-center">
                          <div className="d-flex flex-column"> 
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                            </div>                                 
                              <img className={styles.plus} onClick={onClickPlus} src={isItemsAdded(id) ? "/img/succsessfully.svg" : "/img/plus.svg"} alt="plus" />
                        </div>
          </>
          }
                 
               
            </div>
  )
}
