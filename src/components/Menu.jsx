import React from 'react';
import Circle from './Circle';
import Rectangle from './Rectangle';
import IText from './IText';
import Colors from './Colors';
import Image from './Image';


class Menu extends React.Component {

  render() {
    return (
      <div style={styles.menu}>
        <Circle canvas={this.props.canvas} />
        <Rectangle canvas={this.props.canvas} />
        <Colors canvas={this.props.canvas}/>
        <IText canvas={this.props.canvas}/>
        <Image canvas={this.props.canvas}/>
      </div>
    );
  }
}

const styles = {
  menu: {
    padding: "2rem",
  }
}

export default Menu;
