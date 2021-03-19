import React from 'react'

class ContextualMenu extends React.Component {
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
      <div>
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

      </div>
    )
  }
}

export default ContextualMenu
