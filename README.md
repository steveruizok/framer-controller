# framer-controller

Control Framer X code components through overrides.

# Installation

`npm install framer-controller`

- Open your Framer X project's project folder (File > Show Project Folder) in a [terminal window](https://itunes.apple.com/gb/app/go2shell/id445770608?mt=12).
- Type `npm install framer-controller` and press enter.

# Usage

Create `Controller` instances in an overrides file and use them to control overrides for your components.

```tsx
import { Override } from "framer";
import { Controller } from "framer-controller";

const controller = new Controller({
	width: 200
});

export const myFrame: Override = () => controller.state;

export const myButton: Override = () => ({
	onClick() {
		controller.setState({
			width: 100 + Math.random() * 200
		});
	}
});
```

### Data in Framer X

In Framer X, we use a `Data` object to track properties that may change over time. When that `Data` object changes, any components with properties set from that object will re-render with the current values.

```tsx
import { Data, Override } from "framer";

const myData = Data({
	width: 200,
	height: 200
});

export const myFrame: Override = () => ({
	width: myData.width,
	height: myData.height
});

export const myButton: Override = () => ({
	onClick() {
		myData.width = 128;
		myData.height = 44;
	}
});
```

In the example above, we might assign the `myFrame` override to one frame and `myButton` to another. Clicking on the frame with the `myButton` override would change the height and width of the frame with the `myFrame` override. This would happen because, once clicked, `myButton`'s `onClick` function would change the value of `myData`, a `Data` object; and, because `myFrame` is using `myData`'s values for its `height` and `width` properties, `myFrame` would re-render to display the new properties.

This pattern works well, however it can get very complicated to manage.

### A data Controller

A `Controller` instance allows us to better handle these sorts of changes. Under the hood, a `Controller` implements the above pattern: it has an internal `Data` object and passes the properties of this object to Frames through overrides. The code below will produce exactly the same results as our previous example.

```tsx
import { Override } from "framer";
import { Controller } from "framer-controller";

const controller = new Controller({
	width: 200,
	height: 200
});

export const myFrame: Override = () => controller.state;

export const myButton: Override = () => ({
	onClick() {
		controller.setState({
			width: 128,
			height: 44
		});
	}
});
```

As the example shows, we're now creating a `Controller` instance with a set of initial values. We're connecting `myFrame` to the controller by simply passing the entire `controller.state` object to `myFrame` as an override. When we want to change these values, we're using `controller.setState`.

Though it seems very similar to using the `Data` object directly, this pattern will allow us to do all sorts of interesting things with our data states.

## Going Further

The `Controller` gives us a lot of control over our state.

### State History

As an out-of-the-box example, the `Controller` class supports a stacked history: each time we change the state (through `controller.setState`), we add a new snapshot of the controller's state to its `history`. We can move our `historyPosition` up and down in this stack using the `undo` and `redo` methods (along with the `traverseHistory` and `setHistoryPosition` methods that support these), loading whichever state is in our current position.

```tsx
import { Override } from "framer";
import { Controller } from "framer-controller";

const controller = new Controller({
	width: 200
});

export const myFrame: Override = () => controller.state;

export const myButton: Override = () => ({
	onClick() {
		controller.setState({
			width: 100 + Math.random() * 200
		});
	}
});

export const undoButton: Override = () => ({
	onClick() {
		controller.undo();
	}
});

export const redoButton: Override = () => ({
	onClick() {
		controller.redo();
	}
});
```

In this example, each time we click a frame with the `myButton` override, our frame with the `myFrame` override will get a new random `width` value. If we clicked on a frame with the `undoButton` override, we could restore previous values; and if we clicked on a frame with the `redoButton` override, we could return to later values. Like any undo/redo feature, if we clicked the `myButton` override while after clicking undo, we'd lose the ability to redo.

### Skipping history

If we wanted to change properties without affecting our history stack, we could use the `Controller.updateState` method.

```tsx
import { Override, Animatable } from "framer";
import { Controller } from "framer-controller";

const controller = new Controller({
	width: Animatable(200)
});

export const myFrame: Override = () => controller.state;

export const myButton: Override = () => ({
	onClick() {
		controller.updateState({
			width: 100 + Math.random() * 200
		});
	}
});
```

### Animations

A controller can keep track of animations as well. We can

```tsx
import { Override, Animatable } from "framer";
import { Controller } from "framer-controller";

const controller = new Controller({
	width: Animatable(200)
});

export const myFrame: Override = () => controller.state;

export const myButton: Override = () => ({
	onClick() {
		controller.animate(
			{
				width: 100 + Math.random() * 200
			},
			{
				tension: 500,
				friction: 100
			}
		);
	}
});
```

Note that, when moving through history, the controller will use its `Controller.animationOptions` property for the transition of Animatable properties.

### Callbacks

We may sometimes need to run a second function after our new state takes effect. We can do that using an optional last argument to `Controller.setState`, `Controller.updateState` and `Controller.animate`.

```tsx
import { Override, Animatable } from "framer";
import { Controller } from "framer-controller";

const controller = new Controller({
	width: Animatable(200)
});

export const myFrame: Override = () => controller.state;

export const myButton: Override = () => ({
	onClick() {
		controller.setState(
			{
				width: 100 + Math.random() * 200
			},
			(state, position) => {
				console.log(state.width);
			}
		);
	}
});
```

## Extending Controller

Controller is meant to be extended. Depending on your component, you may use Controller to create imperative methods that pass props to your component.

```tsx
import { Override, Animatable } from "framer";
import { Controller } from "framer-controller";

class BlinkController extends Controller<{
	height: number;
	width: number;
}> {
	blink = () => {
		this.setState({
			height: 32,
			width: 32
		});

		setTimeout(this.undo, 500);
	};
}

const myController = new BlinkController({
	height: 100,
	width: 100
});

export const controller2: Override = () => ({
	...myController.state,
	onClick: myController.blink
});
```
