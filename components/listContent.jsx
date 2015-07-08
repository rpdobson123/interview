import React from 'react';

const ListContentIcon = React.createClass({
  render: function() {
    return (<span><i
                    className={this.props.styleClass}
                    style={deleteStyle} >
                  </i>
            </span>
    );
  }
});

export default ListContentIcon;
