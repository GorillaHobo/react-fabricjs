import React from 'react';

const imageUrls = ["https://picsum.photos/id/1003/600/600", "https://picsum.photos/id/1021/600/600", "https://picsum.photos/id/100/600/600", "https://picsum.photos/id/1011/600/600"]

class CanvasBackground extends React.Component {
  render() {
    return (
      <div>
        {imageUrls.map((imageUrl, index) => (
          <div key={index} onClick={() => this.props.changeColor(imageUrl)} style={styles.imageContainer}>
            <img alt="" src={imageUrl} style={styles.image} />
          </div>
        ))}
      </div>
    )
  }
}

const styles = {
  imageContainer: {
    height: "100px",
    width: "100px",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%",
  }
}

export default CanvasBackground
