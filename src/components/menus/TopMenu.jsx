import React from 'react'
import { fabric } from 'fabric';
import { Tooltip, Button, Select, InputNumber, Divider } from 'antd';

import {AiOutlineClear as ClearAll} from 'react-icons/ai';
import {
  GrTextAlignCenter as Center,
  GrTextAlignFull as Full,
  GrTextAlignLeft as Left,
  GrTextAlignRight as Right,
  GrTrash as Trash
} from 'react-icons/gr';
import {
  FaObjectGroup as Group,
  FaObjectUngroup as Ungroup,
} from 'react-icons/fa';

const { Option } = Select

const fonts = ["Fira Sans", "Cascadia Code", "Jost*"]

class TopMenu extends React.Component {
  constructor() {
    super()
    this.state = {
      currentFontSize: 20
    }
  }

  setFontFamily = (font) => {
    this.props.canvas.getActiveObjects().forEach(obj => {
      if (obj instanceof fabric.IText) obj.set("fontFamily", font)
    })
    this.props.canvas.renderAll()
  }

  setFontSize = (value) => {
    this.setState({ currentFontSize: value })
    this.props.canvas.getActiveObjects().forEach(obj => {
      if (obj instanceof fabric.IText) obj.set("fontSize", this.state.currentFontSize)
    })
    this.props.canvas.renderAll()
  }

  setAlign = (align) => {
    this.props.canvas.getActiveObjects().forEach(obj => {
      if (obj instanceof fabric.IText) obj.set("textAlign", align)
    })
    this.props.canvas.renderAll()
  }

  deleteObjects = () => {
    this.props.canvas.getActiveObjects().forEach((obj) => this.props.canvas.remove(obj))
    this.props.canvas.renderAll()
  }

  groupObjects = () => {
    const objects = this.props.canvas.getActiveObjects()
    if (objects.length > 1) {
      const group = new fabric.Group(objects, { left: 200, top: 200 })
      this.deleteObjects()
      this.props.canvas.add(group)
      this.props.canvas.renderAll()
    }
  }

  ungroupObjects = () => {
    const objects = this.props.canvas.getActiveObjects()
    objects.forEach((group) => {
      if (group.type === "group") {
        group.destroy()
        const oldGroup = group.getObjects()
        this.props.canvas.remove(group)
        this.props.canvas.add(...oldGroup)
        group = null
        this.props.canvas.requestRenderAll()
      }
    })
  }

  clearAll = () => {
    this.props.canvas.clear()
    this.props.canvas.set("backgroundColor", "white")
  }

  check = () => {
    const select = this.props.canvas.getActiveObjects()
    select.forEach((obj) => console.log(obj.type))
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.item}>
          <h5 style={styles.tag}>Size: </h5>
          <InputNumber keyboard min={1} defaultValue={this.state.currentFontSize} onChange={this.setFontSize} />
        </div>
        <div style={styles.item}>
          <h5 style={styles.tag}>Font: </h5>
          <Select defaultValue={fonts[0]} onChange={(value) => this.setFontFamily(value)} style={styles.select}>
            {fonts.map((font, index) => (
              <Option key={index} value={font}>{font}</Option>
            ))}
          </Select>
        </div>
        <Divider type="vertical" />
        <div style={styles.item}>
          <Tooltip title="Align left">
            <Button onClick={() => this.setAlign("left")} icon={<Left />} />
          </Tooltip>
          <Tooltip title="Align center">
            <Button onClick={() => this.setAlign("center")} icon={<Center />} />
          </Tooltip>
          <Tooltip title="Align right">
            <Button onClick={() => this.setAlign("right")} icon={<Right />} />
          </Tooltip>
        </div>
        <Divider type="vertical" />
        <div>
          <Tooltip title="Group">
            <Button onClick={() => this.groupObjects()} icon={<Group />} />
          </Tooltip>
          <Tooltip title="Ungroup">
            <Button onClick={() => this.ungroupObjects()} icon={<Ungroup />} />
          </Tooltip>
        </div>
        <Divider type="vertical" />
        <div>
          <Tooltip title="Delete">
            <Button onClick={() => this.deleteObjects()} icon={<Trash />} />
            <Button onClick={() => this.clearAll()} icon={<ClearAll />} />
          </Tooltip>
        </div>
      </div >
    )
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "10px",
  },
  tag: {
    color: "white",
    marginRight: "5px"
  },
  select: {
    width: "120px"
  }
}

export default TopMenu
