"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const framer_1 = require("framer");
const Controller_1 = require("./Controller");
const utils_1 = require("./utils");
/*
On load, get rects for all children.
Use rects to create a positions array.
    index, midY, and current frameId.
Create an of draggables.
    id, height, width, midX, midY, and current position
When dragging...
    update the dragging frame's draggable midX/midY.
    get the nearest position.
    if it's different from its current, clear dragging's position's current frameId, assign it the new position, and bump all draggables down or up to close the gap.
    Sort draggables by their midX (or midY) values.
Map children to draggable layers.

*/
class DragController extends Controller_1.Controller {
    constructor(options = {}) {
        super(Object.assign({ draggingId: null, horizontal: false, vertical: true, throttle: 16, draggables: {}, positions: [], children: [] }, options));
        this.onConnect = (_, props) => {
            if (!props || !props.children) {
                console.error("Error: Connect this ScrollController to the props of a Frame (using an Override).");
                return this.state;
            }
            const { width: contentWidth, height: contentHeight } = props;
            this._content = { props };
            // get draggables
            const [ids, flagged] = utils_1.recursivelySearchForProp("markerId", { props }, { props });
            this._flagged = ids.map((id, index) => ({ id, frame: flagged[index] }));
            // create children
            const positions = [];
            const draggables = flagged.reduce((acc, marker, index) => {
                const { centerX, centerY, height, width } = marker.props;
                const cx = parseFloat(centerX) / 100;
                const cy = parseFloat(centerY) / 100;
                let id = ids[index];
                if (acc[id]) {
                    console.warn(`Warning: Found markers with the same flagged prop: { markerId: ${id} }! The second will overwrite the first.`);
                }
                acc[id] = {
                    centerX: contentWidth * cx,
                    centerY: contentHeight * cy,
                    top: contentHeight * cy - height / 2,
                    bottom: contentHeight * cy + height / 2,
                    left: contentWidth * cx - width / 2,
                    right: contentWidth * cx + width / 2,
                    height,
                    width,
                    current: index,
                };
                positions.push(Object.assign({}, acc[id], { current: id }));
                return acc;
            }, {});
            const children = this.getChildren(draggables, positions);
            console.log(children);
            this.setState({
                positions,
                draggables,
                children,
            });
        };
        this.getChildren = (draggables, positions) => {
            return this.content.props.children.map((child, index) => {
                const flagged = this._flagged.find(f => f.frame === child);
                if (flagged) {
                    const id = flagged.id;
                    const { left, top, height, width } = draggables[id];
                    return React.createElement(framer_1.Draggable, {
                        left,
                        top,
                        height,
                        width,
                        momentum: false,
                        constraints: null,
                        horizontal: this.state.horizontal,
                        vertical: this.state.vertical,
                        background: null,
                        style: {
                            transition: id === this.state.draggingId ? "none" : "all .2s",
                        },
                        onTapStart: e => this.handleDragStart(id, e),
                        onDragEnd: e => this.handleDragEnd(id, e),
                        onMove: e => this.handleDragMove(id, e),
                    }, React.cloneElement(child, { centerY: "50%", centerX: "50%" }));
                }
                else {
                    return child;
                }
            });
        };
        this.handleDragStart = (id, event) => {
            console.log("drag started", event);
            this.setState({
                draggingId: id,
            });
        };
        this.handleDragMove = (id, event) => {
            const { draggables, positions, draggingId } = this.state;
            if (id !== draggingId) {
                return;
            }
            const dragging = draggables[draggingId];
            const draggingIndex = dragging.current;
            const distance = (position) => Math.abs(position.centerY - (event.y + dragging.height / 2));
            const closest = positions.reduce((a, c) => (distance(a) < distance(c) ? a : c), positions[0]);
            // bail if closest is the dragging frame's current position
            if (closest.current === draggingId) {
                return;
            }
            const closestIndex = positions.indexOf(closest);
            const swapped = closest.current;
            positions[closestIndex].current = draggingId;
            positions[draggingIndex].current = swapped;
            draggables[draggingId] = Object.assign({}, closest, { current: closestIndex });
            draggables[swapped] = Object.assign({}, dragging, { current: draggingIndex });
            const children = this.getChildren(draggables, positions);
            this.setState({
                positions,
                draggables,
                children,
            });
            // this.animate(draggables, "draggables")
        };
        this.handleDragEnd = (id, event) => {
            console.log("drag ended", event);
            setTimeout(() => {
                const { draggables, positions } = this.state;
                const children = this.getChildren(draggables, positions);
                this.setState({
                    draggingId: null,
                    children,
                });
            }, 1000);
        };
        // private updateDraggables = () => {
        // 	const { _positionProps, _draggableProps, content } = this
        // 	if (!content) return
        // 	let draggables = {}
        // 	let positionKeys = Object.keys(_positionProps)
        // 	let positionValues = positionKeys.map(key => _positionProps[key])
        // 	const findNearest = (frame: Frame) => {
        // 		return positionValues.find(
        // 			position =>
        // 				Math.abs(position.centerY - frame.centerY) < frame.height / 2
        // 		)
        // 	}
        // 	for (let key in _draggableProps) {
        // 		const frame = _draggableProps[key]
        // 		const nearest = findNearest(frame)
        // 		draggables[key] = nearest
        // 	}
        // 	this._draggableStates = draggables
        // 	this.animate(draggables, "draggables")
        // }
        this.getDraggable = (props) => {
            if (props.componentIdentifier) {
                if (!props.children) {
                    console.warn(`Error: you must call getMarkers with the props provided by your component's override.`);
                    return;
                }
                const [component] = props.children;
                const { markerId } = component.props;
                return this.draggables[markerId];
            }
            return this.draggables[props.id];
        };
        // this.updateDraggables = throttle(this.updateDraggables, this.state.throttle)
        // this.updateDraggables()
    }
    get content() {
        return this._content;
    }
    get children() {
        return this.state.children;
    }
    get draggables() {
        return this.state.draggables;
    }
    get positions() {
        return this.state.positions;
    }
    get draggingId() {
        return this.state.draggingId;
    }
}
exports.DragController = DragController;
