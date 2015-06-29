import React from 'react';

import Header from './header';
import TodoList from './todo-list';

const HomePage = React.createClass({

  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ marginTop : '50px' }}>
          <h3>Todo List</h3>
          <TodoList />
        </div>
      </div>
    );
  },

});

export default HomePage;
