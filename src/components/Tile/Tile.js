import React, { PureComponent } from "react";

import styles from "./Tile.module.scss";

class Tile extends PureComponent {
  render() {
    const { item, size } = this.props;
    const tileStyle = {
      width: `calc(50vh / ${size} - 8px)`,
      height: `calc(50vh / ${size} - 8px)`,
      float: "left",
      backgroundColor: item.value
        ? `hsl(${(item.value * 1000) % 255}, ${50 + (item.value % 30)}%, ${40 +
            (item.value % 40)}%)`
        : null
    };

    return (
      <div className={styles.Tile} style={tileStyle}>
        {item.value}
      </div>
    );
  }
}

export { Tile };
