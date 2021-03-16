import React from 'react';
import { Spin } from 'antd';

class Canvas extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <canvas id="canvas" />
      </div>
    );
  }
}

const styles = {
  container: {
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  }
}

export default Canvas;
