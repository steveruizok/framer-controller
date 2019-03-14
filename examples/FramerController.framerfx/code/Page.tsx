import { Override } from 'framer'
import { PageComponentController } from '../../../lib'

const controller = new PageComponentController()

export const isPageComponent: Override = (props) => {
	controller.setTotalPages(props)
	return {
		currentPage: controller.currentPage,
		onChangePage: controller.syncCurrentPage,
	}
}

export const isPrevButton: Override = () => ({
	opacity: controller.progress === 0 ? 0.5 : 1,
	onClick: controller.prevPage,
})

export const isNextButton: Override = () => ({
	opacity: controller.progress === 1 ? 0.5 : 1,
	onClick: controller.nextPage,
})

export const isFirstButton: Override = () => ({
	onClick: () => (controller.progress = 0),
})

export const isLastButton: Override = () => ({
	onClick: () => (controller.progress = 1),
})

export const isProgressBar: Override = (props) => ({
	width: controller.progress * (props.width as number),
})

export const isPageNumber: Override = () => ({
	$page: controller.currentPage + 1,
})
