import { fabric } from 'fabric';
import { Button, Tooltip } from 'antd';
import {BiRectangle as RectangleIcon} from 'react-icons/bi';
import BaseObject from './BaseObject';

class Rectangle extends BaseObject {
  createObject() {
   return new fabric.Rect(defaultRectangleProperties);
  }
  render() {
    return (
      <Tooltip title="Create rectangle">
        <Button onClick={() => this.addObject()} icon={<RectangleIcon />} />
      </Tooltip>
    );
  }
}

const defaultRectangleProperties = {
  fill: "transparent",
  stroke: "#282828",
  left: 100,
  top: 100,
  height: 40,
  width: 40
}

export default Rectangle
