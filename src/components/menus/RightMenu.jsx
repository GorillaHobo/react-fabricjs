import React from 'react'

import Circle from '../shapes/Circle';
import Rectangle from '../shapes/Rectangle';
import IText from '../shapes/IText';
import Line from '../shapes/Line';

class RightMenu extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <Circle canvas={this.props.canvas} />
        <Rectangle canvas={this.props.canvas} />
        <IText canvas={this.props.canvas} />
        <Line canvas={this.props.canvas} />
      </div>
    )
  }
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)"
  }
}

export default RightMenu
