import React from 'react';
import { fabric } from 'fabric';
import { Button, Spin, Layout } from 'antd';

import Canvas from './Canvas';
import RightMenu from './menus/RightMenu';
import TopMenu from './menus/TopMenu';
import LeftMenu from './menus/LeftMenu';

const { Header, Footer, Sider, Content } = Layout

class CertificateEditor extends React.Component {
  constructor() {
    super()
    this.state = {
      canvas: {},
      currentObject: null
    }
  }

  componentDidMount() {
    const canvas = new fabric.Canvas("canvas", canvasDefaultValue)
    canvas.on("mouse:up", () => {
      const activeObjects = canvas.getActiveObjects()
      if (activeObjects.length === 1 && activeObjects[0].get('type') !== "group") {
        this.setState({ currentObject: canvas.getActiveObject() })
      } else {
        this.setState({ currentObject: null })
      }
    })
    this.setState({ canvas: canvas })
  }

  check = () => {
    if (this.state.currentObject !== null) {
      console.log(this.state.currentObject);
      return
    }
    console.log("null");
  }

  render() {
    const { canvas, currentObject } = this.state
    return (
      <Layout style={styles.layout} >
        <Header style={styles.header}>
          <TopMenu canvas={canvas} />
        </Header>
        <Layout style={styles.layout}>
          <Sider style={styles.sider}>
            <LeftMenu canvas={canvas} currentObject={currentObject} />
          </Sider>
          <Content style={styles.content}>
            <Canvas canvas={canvas} />
          </Content>
          <Sider style={styles.sider}>
            <RightMenu canvas={canvas} />
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
  width: "434",
  preserveObjectStacking: true,
}


export default CertificateEditor;
