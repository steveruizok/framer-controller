"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
const controller = new lib_1.PageComponentController();
exports.isPageComponent = (props) => {
    controller.setTotalPages(props);
    return {
        currentPage: controller.currentPage,
        onChangePage: controller.syncCurrentPage,
    };
};
exports.isPrevButton = () => ({
    opacity: controller.progress === 0 ? 0.5 : 1,
    onClick: controller.prevPage,
});
exports.isNextButton = () => ({
    opacity: controller.progress === 1 ? 0.5 : 1,
    onClick: controller.nextPage,
});
exports.isFirstButton = () => ({
    onClick: () => (controller.progress = 0),
});
exports.isLastButton = () => ({
    onClick: () => (controller.progress = 1),
});
exports.isProgressBar = (props) => ({
    width: controller.progress * props.width,
});
exports.isPageNumber = () => ({
    $page: controller.currentPage + 1,
});
