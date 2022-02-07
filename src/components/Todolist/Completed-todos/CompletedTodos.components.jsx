import React from 'react';
import Complete from './Complete.component';

const CompletedTodos = ({ completedTodo }) => {
  return (
      <div>
          {completedTodo.map(complete => (
              <Complete 
              complete={complete}
              key={complete.id}
              />
          ))}
      </div>
  );
};

export default CompletedTodos;
