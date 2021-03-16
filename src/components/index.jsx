import React from 'react';
import { fabric } from 'fabric';
import { Button, Spin, Layout } from 'antd';

import Canvas from './Canvas';
import RightMenu from './menus/RightMenu';
import TopMenu from './menus/TopMenu';
import CanvasBackground from './CanvasBackground';

const { Header, Footer, Sider, Content } = Layout

class CertificateEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      canvas: {},
      loaded: false
    }
  }

  componentDidMount() {
    this.setState({ canvas: new fabric.Canvas("canvas", canvasDefaultValue) })
    this.setState({ loaded: true })
  }

  changeBackground = (imageUrl) => {
    new fabric.Image.fromURL(imageUrl, (img) => {
      img.scaleX = this.state.canvas.height / img.height
      img.scaleY = this.state.canvas.width / img.width
      this.state.canvas.setBackgroundImage(img, this.state.canvas.renderAll.bind(this.state.canvas))
    })
  }

  render() {
    return (
      <Layout style={styles.layout}>
        <Header style={styles.header}>
          <TopMenu canvas={this.state.canvas} />
        </Header>
        <Layout style={styles.layout}>
          <Sider style={styles.sider}>
            <CanvasBackground changeColor={this.changeBackground} />
          </Sider>
          <Content style={styles.content}>
            <Canvas canvas={this.state.canvas} />
          </Content>
          <Sider style={styles.sider}>
            <RightMenu canvas={this.state.canvas} />
          </Sider>
        </Layout>
      </Layout>
    );
  }
}

const styles = {
  layout: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkgray"
  },
  content: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
  },
  sider: {
    height: "100%",
    backgroundColor: "gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "20px",
  }
}

const canvasDefaultValue = {
  backgroundColor: "white",
  height: "600",
  width: "600",
}


export default CertificateEditor;
