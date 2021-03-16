import React from 'react'
import { fabric } from 'fabric';
import { Button, Select, InputNumber } from 'antd';
import {
  GrTextAlignCenter as Center,
  GrTextAlignFull as Full,
  GrTextAlignLeft as Left,
  GrTextAlignRight as Right
} from 'react-icons/gr';

const { Option } = Select

const fonts = ["Fira Sans", "Cascadia Code", "Jost*"]

class TopMenu extends React.Component {
  constructor() {
    super()
    this.state = {
      currentFontSize: 20
    }
  }

  componentDidUpdate() {
    // this.props.canvas.on("mouse:up", () => {
    //   const text = this.props.canvas.getActiveObjects().filter((obj) => (obj instanceof fabric.IText))
    // })
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
        <div style={styles.item}>
          <Button onClick={() => this.setAlign("left")} icon={<Left />} />
          <Button onClick={() => this.setAlign("center")} icon={<Center />} />
          <Button onClick={() => this.setAlign("right")} icon={<Right />} />
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
