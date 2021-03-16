import React from 'react';

import Colors from './Colors';
import Image from './Image';
import RightMenu from './menus/RightMenu';


class Menu extends React.Component {

  render() {
    return (
        <RightMenu/>
    );
  }
}

const styles = {
  menu: {
    padding: "2rem",
  }
}

export default Menu;
