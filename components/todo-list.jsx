import React from 'react';
import ListContentIcon from './listContent';

const TodoList = React.createClass({
  deleteEntry: function(index) {
    var state = this.state;
    state.items[index].isAlive = false;
    this.setState(state);
  },
  readInput: function(event) {
    this.setState({userInput: event.target.value});
  },
  tryEnter: function(event) {
    var ENTER = 13;
    if(event.keyCode == 13) {
      this.addEntry();
    }
  },
  addEntry: function() {
    var state = this.state;
    if(state.userInput.length > 0) {
      var newTask = { task: state.userInput,
                      isAlive: true,
                      index: state.items.length };
      state.items.push(newTask);
      state.userInput = '';
      this.setState(state);
    }

  },
  render() {
    var items = this.state.items;
    var listContent = [];
    var submitContent = [];
    var onDelete = this.deleteEntry;
    items.forEach(function(entry, index) {
      if(entry.isAlive) {
        listContent.push(
          <div className="todo-entry">
            <span onClick = {onDelete.bind(this, index)} >
              <i className="icon red-icon fa fa-minus-square"></i>
            </span>
            <span>
              {entry.task}
            </span>
          </div>
        );
      }
    });
    submitContent.push( <input
                          className="todo-text-input"
                          type="text"
                          name="newEntry"
                          onChange={this.readInput}
                          onKeyUp={this.tryEnter} 
                          value={this.state.userInput} >
                        </input>);
    submitContent.push( <div
                          className="icon green-icon fa fa-plus-square"
                          onClick={this.addEntry} >
                        </div>);
    return  <div>
              <div className="todo-container">
                {listContent}
              </div>
              <div className="todo-container">
                {submitContent}
              </div>
            </div>
  },
  getInitialState: function() {
    return {items: __TEST_DATA.items};
  },
});

var __TEST_DATA = {items: [
  {task: 'work it harder', isAlive: true, index: 0},
  {task: 'make it better', isAlive: true, index: 1},
  {task: 'do it faster', isAlive: true, index: 2},
  {task: 'makes us stronger', isAlive: true, index: 3},
  {task: 'more than ever', isAlive: true, index: 4}]};

export default TodoList;
