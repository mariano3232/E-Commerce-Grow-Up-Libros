
import React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getAuthors} from '../actions';
import CardAuthor from './CardAuthor';
import { animateScroll as scroll} from "react-scroll";

const Author = () => {

    const dispatch = useDispatch();
    const authors = useSelector(state => state.authors);    
    const orderedAuthors = authors.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (b.name.toLowerCase() > a.name.toLowerCase()) {
          return -1;
        }
        return 0;
    })
    
    useEffect(() => {
        scroll.scrollToTop();
    }, []);

    return (
        <div>
         
            <ol>
                {
                    orderedAuthors?.map(e => (
                        <Link to={'/author/' + e._id}>
                            
                            <CardAuthor name={e.name} surname={e.surname} picture={e.picture}/>
                        
                        </Link>
                    ))
                }  
            </ol>
      
        </div>
    )
}

export default Author;
