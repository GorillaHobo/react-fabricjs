import React from 'react'

import Image from '../Image';

class LeftMenu extends React.Component {
  render() {
    return(
      <Image canvas={this.props.canvas} />
    )
  }

}

export default LeftMenu
