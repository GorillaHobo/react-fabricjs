import { fabric } from 'fabric';
import { Button } from 'antd';

import BaseObject from './BaseObject';

const url = "https://picsum.photos/1000/1000"
class Image extends BaseObject {

  createObject = (imageUrl) => {
    console.log("hellow");
    new fabric.Image.fromURL(url, (img) => {
      img.scaleX = 1 / 2
      img.scaleY = 1 / 2
      this.props.canvas.add(img)
      this.props.canvas.renderAll()
    })
  }

  cloneSelection = () => {
    this.props.canvas.getActiveObjects().forEach((obj) => this.props.canvas.add(obj))
  }

  render() {
    return (
        <div>
          <Button onClick={() => this.createObject()}>Image</Button>
          <Button onClick={() => this.cloneSelection()}>Clone</Button>
        </div>
    );
  }
}

export default Image;
