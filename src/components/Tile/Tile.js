import React, { PureComponent } from "react";

import { N_SIZE } from "../../constants";

class Tile extends PureComponent {
  render() {
    const { item } = this.props;
    const tileStyle = {
      width: `calc(50vh / ${N_SIZE})`,
      height: `calc(50vh / ${N_SIZE})`,
      float: "left"
    };

    return <div style={tileStyle}>{item.key}</div>;
  }
}

export { Tile };
