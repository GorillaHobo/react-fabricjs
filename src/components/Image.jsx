import { fabric } from 'fabric';
import { Button } from 'antd';

import BaseObject from './shapes/BaseObject';

const url = "https://picsum.photos/1000/1000"
class Image extends BaseObject {

  createObject = (imageUrl) => {
    new fabric.Image.fromURL(url, (img) => {
      img.scaleX = 1 / 2
      img.scaleY = 1 / 2
      this.props.canvas.add(img)
      this.props.canvas.renderAll()
    })
  }

  render() {
    return (
        <div>
          <Button onClick={() => this.createObject()}>Image</Button>
        </div>
    );
  }
}

export default Image;
