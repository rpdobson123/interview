import React from 'react';
import ListContentIcon from './listContent';

const TodoList = React.createClass({
  deleteEntry: function(index) {
    var state = this.state;
    state.items[index].isAlive = false;
    state.unsavedChanges = true;
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
      state.unsavedChanges = true; 	
      this.setState(state);
    }

  },
  saveEntries: function() {
    var state = this.state;
    localStorage.setItem('todoListItems', JSON.stringify(this.state.items));
    this.setState({'unsavedChanges': false});
  },
  loadEntries: function() {
    var savedItems = localStorage.getItem('todoListItems');
    this.setState({'items': JSON.parse(savedItems)});
  },
  render() {
    var items = this.state.items;
    var listContent = [];
    var submitContent = [];
    var saveContent = [];
    var onDelete = this.deleteEntry;
    items.forEach(function(entry, index) {
      if(entry.isAlive) {
        listContent.push(
          <div className="todo-entry">
            <span onClick = {onDelete.bind(this, index)} >
              <i className="icon red fa fa-minus-square"></i>
            </span>
            <span>
              {entry.task}
            </span>
          </div>
        );
      }
    });
    if(this.state.unsavedChanges) {
      saveContent.push( <div>
			  <div
			    className="icon blue fa fa-save"
			    onClick={this.saveEntries} 
			  >
			  Save
			  </div>
			</div>
	);
    } else {
      saveContent.push( <div className="icon blue fa fa-check-square textGreen">
			  Saved!
			</div>
		      );
    };
    if(JSON.parse(localStorage.getItem('todoListItems')).length) {
      saveContent.push( <div>
			  <div
			    className ="icon green fa fa-cloud-download"
			    onClick={this.loadEntries}
			  >
			  Load
			  </div>
			</div>
      );
    }
    submitContent.push( <div>
			  <input
			    className="todo-text-input"
			    type="text"
			    name="newEntry"
			    onChange={this.readInput}
			    onKeyUp={this.tryEnter} 
			    value={this.state.userInput}
			  >
			  </input>
			  <div
			    className="icon addEntry green fa fa-plus-square"
			    onClick={this.addEntry}
			  >
			  </div>
                        </div>);
    return  <div>
	      <div className="todo-container">
		{listContent}
	      </div>
	      <div className="save-container">
		{saveContent}
	      </div>
	      <div className="todo-container">
		{submitContent}
	      </div>
	    </div>;
  },
  getInitialState: function() {
    return {items: default_list.items, unsavedChanges: default_list.unsavedChanges};
  },
});

var default_list =  { unsavedChanges  : true,
                      items           : [
        {task: 'this is a todo list', isAlive: true, index: 0},
        {task: 'now to celebrate!',   isAlive: true, index: 1},
        {task: 'time for sleep...',   isAlive: true, index: 2},
                                        ]
                    };

export default TodoList;
