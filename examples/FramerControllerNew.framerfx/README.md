# Framer Controller ✨

[@steveruizok](https://twitter.com/steveruizok)

This package includes the `framer-controller` library and several example and helper components. See the [`framer-controller` docs](https://framer-controller.netlify.com) to read more about `framer-controller` and each of the controllers included in the library.

> Note: You do not need to use this package to use `framer-controller`. If you’d like to install the library directly, you can do so by opening a terminal at your project’s project folder and entering `npm install framer-controller`.

⚠️ This version breaks earlier ScrollControllers. The new ones are better!

### Scrubber

This package also includes `Scrubber`, a component that uses the `lottie-web` library to display a Lottie animation. Its `progress` prop is a normalized value that sets the animation’s frame: the component will show the animation’s _first_ frame at a `progress` value of `0`  and its _last_ frame at a `progress` value of `1`.

To use this component with the `ScrollController`, try using the following Override, either in a new file with a different controlled Scroll component, or in the same file as the Overrides above.

```tsx
import { Override } from "framer"
import { ScrollController } from "framer-controller"

const controller = new ScrollController()

export const Scroll: Override = props => {   
    return controller.connect(props)
}

export const Scrubber: Override = () => ({
	progress: controller.progress.y,
})
```

### Changelog

#### 1.4.0

- Bumps library, adds `FlowController` and new `ScrollController`, removes Scroll helpers and updates Scrubber.

#### 1.3.0

- Adds notes to example files.

#### 1.2.0

- Adds `LottieScrubber`
- Adds several `ScrollController`-related example components

#### 1.0.0

- whaddup world
- Adds `ScrollMarker` and `ScrollMarkerDesign`
