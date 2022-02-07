import React from 'react';
import './complete.styles.css'

const Complete = ({ complete }) => {
  return (
      <div className='todo-container'>
          <li className='list-item'>{complete.text}</li>
          <button className='complete-button'>Uncomplete</button>
      </div>
  );
};

export default Complete;
