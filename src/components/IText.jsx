import { fabric } from 'fabric';
import { Button, Tooltip, Select } from 'antd';
import { BsCircle as CircleIcon } from 'react-icons/bs';
import BaseObject from './BaseObject';

const { Option } = Select

const fonts = ["Fira Sans", "Cascadia Mono", "Open Sans", "Jost*"]

class IText extends BaseObject {
  constructor() {
    super()
    this.state = {
      currentFont: "Fira Sans"
    }
  }

  createObject() {
    return new fabric.IText("Testing");
  }

  changeFont = (value) => {
    const selection = this.props.canvas.getActiveObject();
    console.log("selection: ", selection instanceof fabric.IText );
    if (selection instanceof fabric.IText) {
      console.log(selection.fontFamily.get({fontFamily}))
      selection.fontFamily = value
      this.props.canvas.renderAll()
    }
  }

  render() {
    return (
      <Tooltip title="Create text">
        <Button onClick={() => this.addObject()}>IText</Button>
        <Select defaultValue={this.state.currentFont} onChange={this.changeFont} style={styles.select}>
          {fonts.map((font, index) => (
            <Option key={index} value={font}>{font}</Option>
          ))}
        </Select>
      </Tooltip>
    );
  }
}

const styles = {
  select: {
    width: "120px"
  }
}

// const defaultCircleProperties = {"Testing"}
export default IText
