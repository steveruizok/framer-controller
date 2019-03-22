"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
const utils_1 = require("./utils");
class ScrollController extends Controller_1.Controller {
    constructor(options = {}) {
        super(Object.assign({ scrollX: 0, scrollY: 0, useMarkers: true, direction: {
                x: "none",
                y: "none",
            }, scrollPoint: {
                x: 0,
                y: 0,
            }, progress: {
                x: 0,
                y: 0,
            }, throttle: 16, markers: {}, onMove: point => this.handleScroll(point), onTapStart: () => this.stopAnimation() }, options));
        this._scrollPoint = {
            x: 0,
            y: 0,
        };
        this.onConnect = (_, props) => {
            if (!props || !props.children) {
                console.error("Error: Connect this ScrollController to the props of a Scroll component (using an Override).");
                return this.state;
            }
            const [component] = props.children;
            const [content] = component.props.children;
            if (!content) {
                console.error("Error: Your Scroll component must be connected to a content Frame.");
                return this.state;
            }
            this._scrollComponent = component;
            this._content = content;
            this._markersProps = this.getMarkersFromContent();
            this.scrollPoint = {
                x: component.props.contentOffsetX || 0,
                y: component.props.contentOffsetY || 0,
            };
            this.updateMarkers();
            return this.state;
        };
        /** Find a child with a given prop / value pair somewhere in its children */
        this.getMarkersFromContent = () => {
            const { height: contentHeight, width: contentWidth } = this.content.props;
            const ids = [];
            const markers = [];
            const recursivelySearchForProp = (parent, component) => {
                const { props } = component;
                const { _overrideForwardingDescription: overrides } = props;
                if (props["markerId"]) {
                    ids.push(props["markerId"]);
                    markers.push(parent);
                }
                else if (overrides) {
                    let key = Object.keys(overrides).find(k => overrides[k] === "markerId");
                    if (key) {
                        ids.push(props.id);
                        markers.push(component);
                    }
                }
                if (Array.isArray(props.children)) {
                    props.children.forEach(c => recursivelySearchForProp(component, c));
                }
                return false;
            };
            recursivelySearchForProp(this, this.content);
            return markers.reduce((acc, marker, index) => {
                const { centerX, centerY, height, width } = marker.props;
                const cx = parseFloat(centerX) / 100;
                const cy = parseFloat(centerY) / 100;
                let id = ids[index];
                if (acc[id]) {
                    console.warn(`Warning: Found markers with the same markerId value, ${id}! The second will overwrite the first.`);
                }
                acc[id] = {
                    top: contentHeight * cy - height / 2,
                    bottom: contentHeight * cy + height / 2,
                    left: contentWidth * cx - width / 2,
                    right: contentWidth * cx + width / 2,
                    height,
                    width,
                };
                return acc;
            }, {});
        };
        this.updateMarkers = () => {
            const { _scrollPoint, _markersProps, connected } = this;
            const { x, y } = _scrollPoint;
            if (!connected)
                return;
            const { height: containerHeight, width: containerWidth } = connected;
            const { height: contentHeight, width: contentWidth } = this.content.props;
            let minX = 0, maxX = containerWidth, minY = 0, maxY = containerHeight;
            let markers = {};
            for (let key in _markersProps) {
                const marker = _markersProps[key];
                const { top, bottom, left, right, height, width } = marker;
                let intersect = {
                    x: 0,
                    y: 0,
                };
                let visible = false;
                let progress = { x: 0, y: 0 };
                let clip = { x: "", y: "" };
                const absolute = { top, bottom, left, right };
                const offset = {
                    top: top + y,
                    right: right + x,
                    bottom: bottom + y,
                    left: left + x,
                };
                if (offset.top > maxY) {
                    clip.y = "below";
                }
                else if (offset.bottom < minY) {
                    clip.y = "above";
                }
                else if (offset.top > minY &&
                    offset.top < maxY &&
                    offset.bottom > maxY) {
                    intersect.y = (maxY - offset.top) / height;
                    clip.y = "clip-bottom";
                    visible = true;
                }
                else if (offset.top < minY &&
                    offset.bottom < maxY &&
                    offset.bottom > minY) {
                    intersect.y = offset.bottom / height;
                    clip.y = "clip-top";
                    visible = true;
                }
                else if (offset.top < minY && offset.bottom > maxY) {
                    intersect.y = containerHeight / height;
                    clip.y = "overflow";
                    visible = true;
                }
                else {
                    intersect.y = 1;
                    clip.y = "contain";
                    visible = true;
                }
                if (offset.left > maxX) {
                    clip.x = "right";
                }
                else if (offset.right < minX) {
                    clip.x = "left";
                }
                else if (offset.left > minX &&
                    offset.left < maxX &&
                    offset.right > maxX) {
                    intersect.x = (maxX - offset.left) / width;
                    clip.x = "clip-right";
                    visible = true;
                }
                else if (offset.left < minX &&
                    offset.right < maxX &&
                    offset.right > minX) {
                    intersect.x = offset.right / width;
                    clip.x = "clip-left";
                    visible = true;
                }
                else if (offset.left < minX && offset.right > maxX) {
                    intersect.x = containerWidth / width;
                    clip.x = "overflow";
                    visible = true;
                }
                else {
                    intersect.x = 1;
                    clip.x = "contain";
                    visible = true;
                }
                progress.y = utils_1.modulate(offset.top, [containerHeight, -height], [0, 1]);
                progress.x = utils_1.modulate(offset.left, [containerWidth, -width], [0, 1]);
                markers[key] = {
                    intersect,
                    absolute,
                    offset,
                    clip,
                    visible,
                    progress,
                };
            }
            this._markerStates = markers;
            this.setState(Object.assign({ markers, progress: {
                    x: x / -(contentWidth - containerWidth),
                    y: y / -(contentHeight - containerHeight),
                }, direction: this._direction }, (this.isAnimating
                ? {}
                : { scrollX: -this._scrollPoint.x, scrollY: -this._scrollPoint.y })));
        };
        this.getMarker = (props) => {
            if (props.componentIdentifier) {
                if (!props.children) {
                    console.warn(`Error: you must call getMarkers with the props provided by your component's override.`);
                    return;
                }
                const [component] = props.children;
                const { markerId } = component.props;
                return this.markers[markerId];
            }
            return this.markers[props.id];
        };
        this.handleScroll = (point) => {
            this.scrollPoint = point;
        };
        this.scrollToPoint = (point, options = {}) => {
            if (this.animation) {
                this.animation.pause();
            }
            point = Object.assign({}, this.scrollPoint, point);
            return this.animate(Object.assign({ scrollX: point.x, scrollY: point.y, duration: 1500 }, options));
        };
        this.scrollToMarker = (id, edge, offset = 0, options = {}) => {
            const marker = this.state.markers[id];
            if (!marker) {
                console.warn(`Error: No marker found for ${id}. Available ids are: ${Object.keys(this.markers).join(", ")}.`);
            }
            if (this.animation) {
                this.animation.pause();
            }
            if (!Array.isArray(edge)) {
                edge = [edge];
            }
            const edgeX = edge.find(e => e === "left" || e === "right");
            const edgeY = edge.find(e => e === "top" || e === "bottom");
            let anim = {};
            if (edgeX) {
                anim.scrollX = marker.absolute[edgeX] - offset;
            }
            if (edgeY) {
                anim.scrollY = marker.absolute[edgeY] - offset;
            }
            return this.animate(Object.assign({}, anim, { duration: 1500 }, options));
        };
        this.updateMarkers = utils_1.throttle(this.updateMarkers, this.state.throttle);
        this.updateMarkers();
    }
    get scrollPoint() {
        return {
            x: this.state.scrollX,
            y: this.state.scrollY,
        };
    }
    set scrollPoint(point) {
        this._direction = {
            y: point.y < this._scrollPoint.y
                ? "down"
                : point.y > this._scrollPoint.y
                    ? "up"
                    : "none",
            x: point.x < this._scrollPoint.x
                ? "right"
                : point.x > this._scrollPoint.x
                    ? "left"
                    : "none",
        };
        this._scrollPoint = point;
        this.updateMarkers();
    }
    get scrollY() {
        return this.state.scrollY;
    }
    set scrollY(scrollY) {
        this._scrollPoint.y = -scrollY;
        this.updateMarkers();
    }
    get scrollX() {
        return this.state.scrollX;
    }
    set scrollX(scrollX) {
        this._scrollPoint.x = -scrollX;
        this.setState({
            scrollX,
        });
    }
    get contentOffset() {
        return {
            contentOffsetX: -this.scrollX,
            contentOffsetY: -this.scrollY,
        };
    }
    get content() {
        return this._content;
    }
    get markers() {
        return this.state.markers;
    }
    get direction() {
        return this.state.direction;
    }
    get progress() {
        return this.state.progress;
    }
}
exports.ScrollController = ScrollController;
