import React from 'react';

const Todos = ({ todos }) => {

    

  return(
    <div>
        {todos.map(e => <li key={e.id}>{e.text}</li>)}
    </div>
  )
};

export default Todos;
