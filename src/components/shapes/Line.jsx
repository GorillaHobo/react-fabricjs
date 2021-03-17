import { fabric } from 'fabric';
import { Button, Tooltip } from 'antd';
import { AiOutlineLine as Line } from 'react-icons/ai';

import BaseObject from './BaseObject';

class Circle extends BaseObject {
  createObject() {
    return new fabric.Path('M 0 0 L 50 0 M 0 0 L 4 -3 M 0 0 L 4 3 z', {
      left: 100,
      top: 100,
      stroke: 'red',
      strokeWidth: 1,
      fill: false
    });
  }

  render() {
    return (
      <Tooltip title="Create circle">
        <Button onClick={() => this.addObject()} icon={<Line />} />
      </Tooltip>
    );
  }
}

const defaultPathProperties = {

}

export default Circle
