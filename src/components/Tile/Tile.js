import React, { PureComponent } from "react";

import { N_SIZE } from "../../constants";
import styles from "./Tile.module.scss";

class Tile extends PureComponent {
  render() {
    const { item } = this.props;
    const tileStyle = {
      width: `calc(50vh / ${N_SIZE} - 8px)`,
      height: `calc(50vh / ${N_SIZE} - 8px)`,
      float: "left"
    };

    return (
      <div className={styles.Tile} style={tileStyle}>
        {item.value}
      </div>
    );
  }
}

export { Tile };
