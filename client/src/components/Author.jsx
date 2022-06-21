
import React from 'react';
import {Link} from 'react-router-dom';

const Author = () => {

    const author = ['Robin Sharma', 'Heinrich Harrer', 'Lao Tse', 'Christian Cameron', 'Phil Knight',
    'Yuval Noah Harari', 'Sun Tzu', 'Lucius Plutarco', 'Herman Hesse', 'Soygal Rimpoche'];

    return (
        <div>

            <ol>
                {
                    author?.map(e => (
                        <Link to='/author/:id'><li key={e}>{e}</li></Link>
                    ))
                }
            </ol>
      
        </div>
    )
}

export default Author;
