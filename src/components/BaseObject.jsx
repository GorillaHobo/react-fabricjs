import React from 'react';

class baseObject extends React.Component {
  addObject() {
    this.props.canvas.add(this.createObject())
  }
}

export default baseObject
