import React from "react";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCarouselImages } from "../actions";
import {Image} from 'cloudinary-react'
import styles from "../Styles/Carousel.module.css";

export default function Carousel() {

  const dispatch=useDispatch();
  const lastBooks = useSelector((state) => state.carousel);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBook, setcurrentBook] = useState(lastBooks[0]);
  const [loaded, setLoaded] = useState(false);
 console.log('lastBooks :',lastBooks)
  useEffect(()=>{
    dispatch(getCarouselImages())
  },[dispatch])

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  });

  const previus = () => {
    setLoaded(false);
    setTimeout(() => {
      if (currentIndex !== 0) {
        setCurrentIndex(currentIndex - 1);
        setcurrentBook(lastBooks[currentIndex - 1]);
      } else {
        setCurrentIndex(lastBooks.length - 1);
        setcurrentBook(lastBooks[lastBooks.length - 1]);
      }
    }, 500);
  };
  const next = () => {
    setLoaded(false);
    setTimeout(() => {
      if (currentIndex !== lastBooks.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setcurrentBook(lastBooks[currentIndex + 1]);
      } else {
        setCurrentIndex(0);
        setcurrentBook(lastBooks[0]);
      }
    }, 500);
  };
  return (
    <div className={styles.all}>
      <div className={styles.container}>
        <Link to={"/book/" + currentBook?._id}>
        <Image cloudName='dflpxjove' publicId={currentBook}
        className={loaded ? styles.loaded : styles.img}
        onLoad={() => {
          setLoaded(true);
        }}
        />
          {/* <img
            src={currentBook?.cover}
            alt="Cover"
            className={loaded ? styles.loaded : styles.img}
            onLoad={() => {
              setLoaded(true);
            }}
          /> */}
        </Link>
        
        <div>
          <button onClick={previus} className={styles.buttons}>{"<"}</button>
          <button onClick={next} className={styles.buttons}>{">"}</button>
        </div>
      </div>
    </div>
  );
}