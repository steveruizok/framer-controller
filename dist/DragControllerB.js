"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const framer_1 = require("framer");
const Controller_1 = require("./Controller");
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
        super(Object.assign({ draggingId: null, horizontal: false, vertical: true, transition: ".16s", children: [] }, options));
        this.onConnect = (_, props) => {
            if (!props || !props.children) {
                console.error("Error: Connect this ScrollController to the props of a Frame (using an Override).");
                return this.state;
            }
            this._content = { props };
            const { width: contentWidth, height: contentHeight } = props;
            // get draggables
            let draggables = [];
            let positions = [];
            props.children.forEach((child, index) => {
                const { centerX, centerY, height, width } = child.props;
                const cx = parseFloat(centerX) / 100;
                const cy = parseFloat(centerY) / 100;
                const bounds = {
                    midX: contentWidth * cx,
                    midY: contentHeight * cy,
                    top: contentHeight * cy - height / 2,
                    left: contentWidth * cx - width / 2,
                    height,
                    width,
                };
                const draggable = Object.assign({}, bounds, { id: child.props.id, position: index });
                const position = Object.assign({}, bounds, { index, draggableId: child.props.id });
                positions.push(position);
                draggables.push(draggable);
            });
            this._positions = positions;
            this._draggables = draggables;
            this.setState({
                children: this.getChildren(),
            });
        };
        this.getChildren = () => {
            const { horizontal, vertical, transition } = this.state;
            return this.content.props.children.map((child, index) => {
                const draggable = this._draggables.find(d => d.id === child.props.id);
                const { id, left, top, height, width } = draggable;
                const isDragging = id === this._draggingId;
                return React.createElement(framer_1.Draggable, {
                    key: id,
                    left,
                    top,
                    height,
                    width,
                    momentum: false,
                    constraints: {
                        x: left,
                        y: top,
                    },
                    overdragScale: 1,
                    horizontal,
                    vertical,
                    background: null,
                    scale: isDragging ? 1.06 : 1,
                    opacity: isDragging ? 0.9 : 1,
                    z: isDragging ? 9999 : undefined,
                    style: {
                        transition: isDragging ? "none" : `all ${transition}`,
                        boxShadow: isDragging ? "0px 4px 10px 2px rgba(0,0,0,.2)" : "none",
                    },
                    onTapStart: e => this.handleDragStart(id, e),
                    onTapEnd: e => this.handleDragEnd(id, e),
                    onMove: e => this.handleDragMove(id, e),
                }, React.cloneElement(child, {
                    centerY: "50%",
                    centerX: "50%",
                    constraints: null,
                }));
            });
        };
        this.handleDragStart = (id, event) => {
            this._draggingId = id;
            this.setState({
                draggingId: id,
                children: this.getChildren(),
            });
        };
        this.handleDragMove = (id, event) => {
            const draggable = this._draggables.find(d => d.id === id);
            draggable.top = event.y;
            draggable.midY = event.y + draggable.height / 2;
            const indices = this._draggables.map(d => d.position);
            const sorted = [...this._draggables].sort((a, b) => a.midY < b.midY ? -1 : 1);
            const sortedIndex = sorted.map(d => d.position);
            const changed = !indices.every((value, index) => sortedIndex[index] == value);
            if (changed) {
                this._draggables = sorted.map((d, index) => {
                    const position = this._positions[index];
                    const { top, left, midX, midY } = position;
                    position.draggableId = d.id;
                    return Object.assign({}, d, { top,
                        left,
                        midX,
                        midY, position: index });
                });
                this.setState({
                    children: this.getChildren(),
                });
            }
        };
        this.handleDragEnd = (id, event) => {
            console.log("drag ended", event);
            this._draggingId = null;
            this.setState({
                draggingId: null,
                children: this.getChildren(),
            });
        };
        // this.updateDraggables = throttle(this.updateDraggables, this.state.throttle)
        // this.updateDraggables()
    }
    get draggingId() {
        return this.state.draggingId;
    }
    get content() {
        return this._content;
    }
    get children() {
        return this.state.children;
    }
}
exports.DragController = DragController;
