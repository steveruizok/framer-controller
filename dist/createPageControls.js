"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function createPageControls(loop = false) {
    // Store
    let store = {
        connected: null,
        progress: 0,
        currentPage: 0,
        pages: [],
        loop,
        history: [0],
    };
    const storeSetters = new Set();
    const setStoreState = (changes) => {
        store = Object.assign({}, store, changes);
        store.progress = store.currentPage / (store.pages.length - 1) || 0;
        storeSetters.forEach((setter) => setter(store));
    };
    // Hook
    const usePageControls = (props) => {
        const [state, setState] = React.useState(store);
        React.useEffect(() => () => storeSetters.delete(setState), []);
        storeSetters.add(setState);
        const set = (values) => {
            setStoreState(values);
        };
        if (props) {
            React.useEffect(() => {
                const componentProps = props.children[0].props;
                setStoreState({
                    currentPage: componentProps.currentPage,
                    pages: componentProps.children,
                });
            }, [props.currentPage, props.pages]);
        }
        /**
         * Ensure that the next page is an actual page.
         */
        const validatePageIndex = (index) => {
            const { pages } = state;
            let nextPage;
            if (state.loop) {
                nextPage = (pages.length + index) % pages.length;
            }
            else {
                nextPage = index;
            }
            return Math.max(Math.min(nextPage, pages.length - 1), 0);
        };
        /**
         * Updates the hook when the user changes the Page component's current page.
         */
        const onChangePage = (currentPage) => {
            if (currentPage !== state.currentPage) {
                set({
                    currentPage,
                });
            }
        };
        /**
         * Snaps the page component to the page at the provided index. Defaults to
         * `0`.
         */
        const snapToPage = (index = 0) => {
            const { pages, history, currentPage } = state;
            const nextPage = validatePageIndex(index);
            if (nextPage !== currentPage) {
                set({
                    currentPage: nextPage,
                    history: [...history, currentPage],
                });
            }
        };
        /**
         * Snaps the page component to the next page in a given direction,
         * either `"right"` or `"left"`. Defaults to `"right"`.
         */
        const snapToNextPage = (direction = 'right') => {
            const next = nextPage(direction);
            if (next === null)
                return;
            snapToPage(next);
        };
        /**
         * Snaps the page component to the previous page in the hook's "history"
         * of visited pages.
         */
        const snapToPreviousPage = () => {
            const { history, currentPage } = state;
            if (history.length <= 1)
                return;
            const h = [...history];
            const nextPage = validatePageIndex(h.pop());
            if (nextPage !== currentPage) {
                set({
                    currentPage: nextPage,
                    history: h,
                });
            }
        };
        /**
         * Snaps the page component to the nearest page to a given "progress"
         * value, where `0` is the Page component's first page and `1` is the last.
         */
        const snapToProgress = (progress) => {
            const { pages } = state;
            const index = Math.round((pages.length - 1) * progress);
            snapToPage(index);
        };
        /**
         * Returns the index of the next page in the given direction, or else
         * `null` if no page exists in that direction.
         */
        const nextPage = (direction = 'right') => {
            const { pages, currentPage } = state;
            const offset = direction === 'right' ? 1 : -1;
            if (state.loop) {
                return (pages.length + (currentPage + offset)) % pages.length;
            }
            else {
                const next = currentPage + offset;
                return next < 0 || next > pages.length - 1 ? null : next;
            }
        };
        /**
         * Returns the index of the previous page in the hook's "history" of
         * visited pages, or else `null` if no page exists.
         */
        const previousPage = () => {
            const { history } = state;
            const h = [...history];
            if (h.length <= 1) {
                return null;
            }
            return validatePageIndex(h.pop());
        };
        return {
            pages: store.pages,
            currentPage: store.currentPage,
            totalPages: store.pages.length,
            progress: store.progress,
            history: store.history,
            nextPage,
            previousPage,
            snapToNextPage,
            snapToPage,
            snapToPreviousPage,
            snapToProgress,
            onChangePage,
        };
    };
    return usePageControls;
}
exports.createPageControls = createPageControls;
