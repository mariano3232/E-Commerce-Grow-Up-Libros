import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../Styles/SideBar.module.css"

export default function SideBar() {
  const allBooks = useSelector((state) => state.booksTop);

  const orderBooksByRating = allBooks.sort((a, b) => {
    if (a.price > b.price) return 1;
    if (b.price > a.price) return -1;
    return 0;
  });

  const top5Rating = orderBooksByRating.slice(0, 5);


   

    return(
        <div className={styles.container}>
            <div>
                <h3 className={styles.title}>Top 5 Rating</h3>
                {top5Rating.length
                ?<div className={styles.top}>
                    {
                        top5Rating.map((e,i)=>{
                           return <Link to={'/book/'+e._id}><div className={styles.card}><h5>#{i+1}</h5><img src={e.cover} className={styles.img}></img><h3>{e.title}</h3><h3 className={styles.price}>{e.price}$</h3></div></Link>
                        })
                    }                    
                </div>
                :'No'
                }
            </div>
            <div>
                <h3 className={styles.title}>Top 5 Sold</h3>
                <h5>Soon...</h5>
            </div>
        </div>
    )
}
