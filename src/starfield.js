import React, { Fragment } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { css } from "glamor";

import { classNames } from "styles/utils";
import { inverseLerp } from "helpers/math_helpers";
import { $floating, $fillDimensions } from "styles/shared";
import { polarToCartesian } from "helpers/math_helpers";

const $sortOfglowy = css({
  mixBlendMode: "soft-light"
});
const $glowy = css({
  filter: "blur(2px) brightness(6)",
  mixBlendMode: "multiply"
});
const $extraGlowy = css({
  filter: "blur(14px) brightness(4)"
});

const STAR_COLOR_MAPPINGS = {
  blue: "#4444FF",
  blueWhite: "#A7D8FF",
  white: "#FFFFFF",
  yellowWhite: "#FFFFAA",
  yellow: "#FFFF22",
  lightOrange: "#FFC78E",
  orangeRed: "#FFA622",
  red: "#DD2222"
};

const STAR_SIZE_MAPPINGS = {
  hypergiant: 3,
  supergiant: 2.5,
  giant: 2,
  standard: 1.5,
  dwarf: 1
};

export default class Starfield extends React.Component {
  static propTypes = {
    stars: PropTypes.array.isRequired,
    starsTransformOverTime: PropTypes.func,
    glowy: PropTypes.bool,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    zoom: PropTypes.number
  };

  static defaultProps = {
    stars: [],
    glowy: false,
    zoom: 1,
    aspectRatio: 1
  };

  static contextTypes = {
    gameloop: PropTypes.object
  };

  updateCanvases() {
    const context = this.mainCanvas.getContext("2d");
    context.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
    this.stars.forEach(star => this.drawStar(star, context));
    if (this.props.glowy) {
      const canvasCopyContext = this.canvasCopy.getContext("2d");
      canvasCopyContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
      canvasCopyContext.drawImage(this.mainCanvas, 0, 0);
      const canvasCopy2Context = this.canvasCopy2.getContext("2d");
      canvasCopy2Context.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
      canvasCopy2Context.drawImage(this.mainCanvas, 0, 0);
    }
  }

  drawStar(star, context) {
    let { x, y } = star.pos;
    if (x === undefined && y === undefined) {
      const cartesian = polarToCartesian(star.pos.r, star.pos.t);
      x = cartesian.x;
      y = cartesian.y;
    }
    const xInverseLerpValue = inverseLerp(this.minX / this.props.zoom, this.maxX / this.props.zoom, x);
    const yInverseLerpValue = inverseLerp(this.minY / this.props.zoom, this.maxY / this.props.zoom, y);
    x = this.props.width * xInverseLerpValue * window.devicePixelRatio;
    y = this.props.height * yInverseLerpValue * window.devicePixelRatio;
    const size = STAR_SIZE_MAPPINGS[star.size] * window.devicePixelRatio;
    const color = STAR_COLOR_MAPPINGS[star.type];
    context.fillStyle = color;
    context.fillRect(x - size / 2, y - size / 2, size, size);
  }

  updateInternalProps(props) {
    this.maxX = _.maxBy(props.stars, "pos.x").pos.x;
    this.minX = _.minBy(props.stars, "pos.x").pos.x;
    this.maxY = _.maxBy(props.stars, "pos.y").pos.y;
    this.minY = _.minBy(props.stars, "pos.y").pos.y;
    this.size = Math.min(this.props.width, this.props.height);
    this.stars = props.stars;
  }

  updateStars(dt) {
    this.stars = this.stars.map(this.props.starsTransformOverTime(dt));
    this.updateCanvases();
  }

  constructor(props) {
    super(props);
    this.updateInternalProps(props);
    this._updateStars = this.updateStars.bind(this);
  }

  componentWillMount() {
    this.updateInternalProps(this.props);
  }

  componentDidMount() {
    this.updateCanvases();
    if (this.props.starsTransformOverTime) {
      this.context.gameloop.subscribe(this._updateStars);
    }
  }

  componentWillUnmount() {
    if (this.props.starsTransformOverTime) {
      this.context.gameloop.unsubscribe(this._updateStars);
    }
  }

  componentDidUpdate() {
    this.updateCanvases();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.width != this.props.width || nextProps.height != this.props.height;
  }

  render() {
    const width = this.props.width * window.devicePixelRatio;
    const height = this.props.height * window.devicePixelRatio;
    return (
      <Fragment>
        {this.props.glowy && (
          <canvas
            className={classNames($floating, $fillDimensions, $sortOfglowy)}
            ref={ref => (this.canvasCopy = ref)}
            width={width}
            height={height}
          />
        )}
        <canvas
          className={classNames($glowy, $fillDimensions)}
          ref={ref => (this.mainCanvas = ref)}
          width={width}
          height={height}
        />
        {this.props.glowy && (
          <canvas
            className={classNames($floating, $extraGlowy, $fillDimensions)}
            ref={ref => (this.canvasCopy2 = ref)}
            width={width}
            height={height}
          />
        )}
      </Fragment>
    );
  }
}
