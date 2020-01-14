import React, { PureComponent } from "react";

import { N_SIZE } from "../../constants";
import styles from "./Tile.module.scss";

class Tile extends PureComponent {
  render() {
    const { item } = this.props;
    const tileStyle = {
      width: `calc(50vh / ${N_SIZE} - 8px)`,
      height: `calc(50vh / ${N_SIZE} - 8px)`,
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
