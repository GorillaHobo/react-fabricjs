import React from 'react';
import { fabric } from 'fabric';
import { Button} from 'antd';
import { BiText as TextIcon } from 'react-icons/bi';

const defaultProperty = {
  left: 100,
  top: 100,
  fontFamily: "Jost*",
}

class Text extends React.Component {
  createText() {
    const text = new fabric.Text("Testing", defaultProperty)
    return text
  }

  addText() {
    this.props.canvas.add(this.createText())
  }

  render() {
    return (
        <Button onClick={() => this.addText()}><TextIcon /></Button>
    );
  }
}

export default Text;
