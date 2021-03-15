import React from 'react';
import { fabric } from 'fabric';
import { Button } from 'antd';

import Canvas from './Canvas';
import Menu from './Menu';
import CanvasBackground from './CanvasBackground';

class CertificateEditor extends React.Component {
  constructor() {
    super()
    this.state = {
      canvas: {},
    }
  }

  componentDidMount() {
    this.setState({ canvas: new fabric.Canvas("canvas", canvasDefaultValue) })
  }

  changeBackground = (imageUrl) =>  {
    new fabric.Image.fromURL(imageUrl, (img) => {
      img.scaleX = this.state.canvas.height / img.height
      img.scaleY = this.state.canvas.width / img.width
      this.state.canvas.setBackgroundImage(img, this.state.canvas.renderAll.bind(this.state.canvas))
    })
  }

  render() {
    return (
      <div style={styles.container}>
        <CanvasBackground changeColor={this.changeBackground} />
        <Canvas canvas={this.state.canvas} />
        <Menu canvas={this.state.canvas} />
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "gray",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}
const canvasDefaultValue = {
  backgroundColor: "white",
  height: "600",
  width: "600",
}


export default CertificateEditor;
