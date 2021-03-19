import React from 'react';
import { fabric } from 'fabric';
import { Button } from 'antd';
import { message } from 'antd';

import { AiOutlineCloudUpload as Upload } from 'react-icons/ai';

import BaseObject from './shapes/BaseObject';

const url = "https://picsum.photos/1000/1000"
class Image extends BaseObject {
  constructor() {
    super()
    this.state = {
      images: [],
      isDragging: false,
    }
  }

  dropRef = React.createRef()
  fileRef = React.createRef()
  componentDidMount() {
    let div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
  }
  componentWillUnmount() {
    let div = this.dropRef.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleDrop)
  }

  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ isDragging: true })
  }
  handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ isDragging: false })
  }
  handleDrop = (e) => {
    const limit = 5
    e.preventDefault()
    e.stopPropagation()
    this.setState({ isDragging: false })
    if (e.dataTransfer.files && e.dataTransfer.files.length === 1) {
      const file = e.dataTransfer.files[0]
      if (file.type !== "image/png" || file.type !== "image/jpeg") {
        message.error(`Unsupported format`);
        return
      }
      const isLimit = file.size / 1024 / 1024 < limit;
      if (!isLimit) {
        message.error(`Limited to ${limit}MB or less`);
        return
      }
      this.setState({ images: [...this.state.images, e.dataTransfer.files[0]] })
      e.dataTransfer.clearData()
    }
  }

  addImage = (image) => {
    const url = URL.createObjectURL(image)
    new fabric.Image.fromURL(url, (img) => {
      img.scaleX = 1 / 2
      img.scaleY = 1 / 2
      this.props.canvas.add(img)
      this.props.canvas.requestRenderAll()
    })
  }

  clickHandler = e => {
    this.fileRef.current.click()
  }

  fileHandler = e => {
    const limit = 5
    e.preventDefault()
    e.stopPropagation()
    if (e.target.files && e.target.files.length === 1) {
      const file = e.target.files[0]
      const isLimit = file.size / 1024 / 1024 < limit;
      if (!isLimit) {
        message.error(`Limited to ${limit}MB or less`);
        return
      }
      this.setState({ images: [...this.state.images, file] })
    }
  }

  render() {
    return (
      <div>
        <div ref={this.dropRef} style={styles.div} onClick={() => this.fileRef.current.click()}>
          <Upload />
          <h5>Click or drag and drop to upload image</h5>
          <input ref={this.fileRef} type="file" accept=".png, .jpg, .jpeg" style={styles.input} onChange={this.fileHandler} />
        </div>
        <div>
          {this.state.images.map((image, index) => (
            <div key={index} onClick={() => this.addImage(image)} style={{ ...styles.preview, backgroundImage: `url(${URL.createObjectURL(image)})` }} />
          ))}
        </div>
      </div >
    )
  }
}

const styles = {
  div: {
    width: "100px",
    height: "100px",
    border: "2px black dotted",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  input: {
    width: "100%",
    height: "100px",
    display: "none"
  },
  preview: {
    height: "50px",
    width: "50px",
    backgroundSize: "cover"
  }
}

export default Image;
