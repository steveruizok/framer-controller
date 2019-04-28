import { Override, transform, useTransform, useMotionValue } from 'framer'
import { ScrollController } from './ScrollController1'
// Override Docs: https://framer.com/docs/overrides

const controller = new ScrollController()

export function Scroll(props): Override {
	controller.connect(props)
	return controller.overrides
}

export function Box(props): Override {
	const marker = controller.markers[props.id]
	if (!marker) return {}

	return {
		x: useTransform(controller.progress.y, (v) => v * 100),
		onTap: () => controller.scrollToFrame(props.id, 'top', 32),
	}
}
