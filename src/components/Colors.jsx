import React from 'react';
import { Switch } from 'antd';
import {IoIosSquareOutline as Outline, IoIosSquare as Fill } from 'react-icons/io';
const colors = [null, "red", "blue", "yellow", "white", "black"]

class Colors extends React.Component {
  constructor() {
    super()
    this.state = {
      fill: true
    }
  }

  setFillOrStroke = (checked) => {
    this.setState({ fill: checked })
  }

  changeColor = (color) => {
    this.props.canvas.getActiveObjects().forEach((obj) => obj.set(this.state.fill ? "fill" : "stroke", color))
    this.props.canvas.renderAll()
  }

  render() {
    return (
      <div style={{display: "flex", flexDirection: "column"}}>
        <div style={{display: "flex"}}>
          {colors.map((color, index) => (
            <div key={index} style={{ height: "20px", width: "20px", backgroundColor: color }} onClick={() => this.changeColor(color)} />
          ))}
        </div>
        <Switch checkedChildren={"Fill"} unCheckedChildren={"Outline"} defaultChecked onChange={this.setFillOrStroke} />
      </div>
    );
  }
}

export default Colors;
