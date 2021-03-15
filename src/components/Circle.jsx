import { fabric } from 'fabric';
import { Button, Tooltip } from 'antd';
import { BsCircle as CircleIcon } from 'react-icons/bs';
import BaseObject from './BaseObject';

class Circle extends BaseObject {
  createObject() {
    return new fabric.Circle(defaultCircleProperties);
  }

  render() {
    return (
      <Tooltip title="Create circle">
        <Button onClick={() => this.addObject()} icon={<CircleIcon />} />
      </Tooltip>
    );
  }
}

const defaultCircleProperties = {
  radius: 20,
  fill: "transparent",
  stroke: "#282828",
  left: 100,
  top: 100
}

export default Circle
