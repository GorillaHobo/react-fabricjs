import React from 'react'
import { fabric } from 'fabric';
import { Button, Tooltip, Select, InputNumber } from 'antd';
import BaseObject from './BaseObject';
import { BsFonts } from 'react-icons/bs';

class IText extends BaseObject {
  createObject() {
    return new fabric.IText("Lorem Ipsum", defaultITextProperty);
  }

  render() {
    return (
      <Tooltip title="Create text" style={{ display: "flex", flexDirection: "column" }}>
        <Button onClick={() => this.addObject()} icon={<BsFonts />} />
      </Tooltip>
    );
  }
}

const defaultITextProperty = { fontFamily: "Cascadia Code", fontSize: 20 }
export default IText
