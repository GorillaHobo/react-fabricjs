import React from 'react'
import { fabric } from 'fabric';
import { Tooltip, Button, Select, InputNumber, Divider } from 'antd';

import {
  FiChevronUp as Forward,
  FiChevronDown as Backward,
  FiChevronsUp as Front,
  FiChevronsDown as Back,
} from 'react-icons/fi';
import {
  CgAlignBottom as Bottom,
  CgAlignCenter as Center,
  CgAlignLeft as Left,
  CgAlignMiddle as Middle,
  CgAlignRight as Right,
  CgAlignTop as Top,
} from 'react-icons/cg';
import { MdCropPortrait as Portrait, MdCropLandscape as Landscape } from 'react-icons/md';
import { AiOutlineClear as ClearAll } from 'react-icons/ai';
import { GrTrash as Trash } from 'react-icons/gr';
import { FaObjectGroup as Group, FaObjectUngroup as Ungroup, } from 'react-icons/fa';

const { Option } = Select

const fonts = ["Fira Sans", "Cascadia Code", "Jost*"]

class TopMenu extends React.Component {
  constructor() {
    super()
    this.state = {
      isLandscape: false
    }
  }

  deleteObjects = () => {
    this.props.canvas.getActiveObjects().forEach((obj) => this.props.canvas.remove(obj))
    this.props.canvas.renderAll()
  }

  groupObjects = () => {
    const objects = this.props.canvas.getActiveObjects()
    if (objects.length > 1) {
      console.log("chek");
      const group = new fabric.Group(objects, { left: 200, top: 200 })
      console.log(group);
      // this.deleteObjects()
      // this.props.canvas.add(group)
      // this.props.canvas.renderAll()
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

  setLandscape = () => {
    if (this.state.isLandscape) return
    this.setState({ isLandscape: true })
    this.props.canvas.setHeight(434)
    this.props.canvas.setWidth(600)
  }

  setPortrait = () => {
    if (!this.state.isLandscape) return
    this.setState({ isLandscape: false })
    this.props.canvas.setHeight(600)
    this.props.canvas.setWidth(434)
  }

  align = (direction) => {
    let left, right, center, top, bottom, middle
    const objects = this.props.canvas.getActiveObjects()
    if (objects.length <= 1) return

    switch (direction) {
      case "left":
        left = 0
        objects.forEach(obj => {
          if (obj.left < left) left = obj.left
        })
        objects.forEach(obj => {
          obj.set("left", left)
        })
        this.props.canvas.requestRenderAll()
        break

      case "right":
        right = 0
        objects.forEach(obj => {
          if (obj.left + (obj.width * obj.zoomX) > right) {
            right = obj.left + (obj.width * obj.zoomX)
          }
        })
        objects.forEach(obj => {
          obj.set("left", right - (obj.width * obj.zoomX))
        })
        this.props.canvas.requestRenderAll()
        break

      case "top":
        top = 0
        objects.forEach(obj => {
          if (obj.top < top) top = obj.top
        })
        objects.forEach(obj => {
          obj.set("top", top)
        })
        this.props.canvas.requestRenderAll()
        break

      case "bottom":
        bottom = 0
        objects.forEach(obj => {
          if (obj.top + (obj.height * obj.zoomY) > bottom) {
            bottom = obj.top + (obj.height * obj.zoomY)
          }
        })
        console.log("ini bottom: ", bottom);
        objects.forEach(obj => {
          obj.set("top", bottom - (obj.height * obj.zoomY))
        })
        this.props.canvas.requestRenderAll()
        break

      case "center":
        left = 0
        right = 0
        center = 0
        objects.forEach(obj => {
          if (obj.left < left) left = obj.left
          if (obj.left + (obj.width * obj.zoomX) > right) {
            right = obj.left + (obj.width * obj.zoomX)
          }
        })
        center = (left + right) / 2
        objects.forEach(obj => {
          obj.set("left", center - (obj.width * obj.scaleX / 2))
        })

        this.props.canvas.requestRenderAll()
        break

      case "middle":
        top = 0
        bottom = 0
        middle = 0
        objects.forEach(obj => {
          if (obj.top < top) top = obj.top
          if (obj.top + (obj.height * obj.zoomY) > bottom) {
            bottom = obj.top + (obj.height * obj.zoomY)
          }
        })
        middle = (top + bottom) / 2
        objects.forEach(obj => {
          obj.set("top", middle - (obj.width * obj.scaleY / 2))
        })
        this.props.canvas.requestRenderAll()
        break

      default:
        break
    }

  }

  order = (order) => {
    const object = this.props.canvas.getActiveObject()
    switch (order) {
      case "front":
        object && this.props.canvas.bringToFront(object).requestRenderAll()
        break
      case "back":
        object && this.props.canvas.sendToBack(object).requestRenderAll()
        break
      case "forward":
        object && this.props.canvas.bringForward(object).requestRenderAll()
        break
      case "backward":
        object && this.props.canvas.sendBackwards(object).requestRenderAll()
        break
      default:
        break
    }
  }

  check = () => {
    const select = this.props.canvas.getActiveObjects()
    select.forEach((obj) => console.log(obj.zoomY))
  }

  render() {
    return (
      <div style={styles.container}>
        <div>
          <Tooltip title="Send backwards">
            <Button onClick={() => this.order("backward")} icon={<Backward />} />
          </Tooltip>
          <Tooltip title="Bring forward">
            <Button onClick={() => this.order("forward")} icon={<Forward />} />
          </Tooltip>
          <Tooltip title="Bring to front">
            <Button onClick={() => this.order("front")} icon={<Front />} />
          </Tooltip>
          <Tooltip title="Send to back">
            <Button onClick={() => this.order("back")} icon={<Back />} />
          </Tooltip>
        </div>
        <Divider type="vertical" />
        <div>
          <Tooltip title="Landscape">
            <Button type={this.state.isLandscape && "primary"} onClick={() => this.setLandscape()} icon={<Landscape />} />
          </Tooltip>
          <Tooltip title="portrait">
            <Button type={!this.state.isLandscape && "primary"} onClick={() => this.setPortrait()} icon={<Portrait />} />
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
          <Tooltip title="Align left">
            <Button onClick={() => this.align("left")} icon={<Left />} />
          </Tooltip>
          <Tooltip title="Align center">
            <Button onClick={() => this.align("center")} icon={<Center />} />
          </Tooltip>
          <Tooltip title="Align right">
            <Button onClick={() => this.align("right")} icon={<Right />} />
          </Tooltip>
          <Tooltip title="Align top">
            <Button onClick={() => this.align("top")} icon={<Top />} />
          </Tooltip>
          <Tooltip title="Align middle">
            <Button onClick={() => this.align("middle")} icon={<Middle />} />
          </Tooltip>
          <Tooltip title="Align bottom">
            <Button onClick={() => this.align("bottom")} icon={<Bottom />} />
          </Tooltip>
        </div>
        <Divider type="vertical" />
        <div>
          <Tooltip title="Clear selected">
            <Button onClick={() => this.deleteObjects()} icon={<Trash />} />
          </Tooltip>
          <Tooltip title="Clear all">
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
