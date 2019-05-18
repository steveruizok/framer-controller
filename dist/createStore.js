"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
// Store
function createStore(state) {
    let storeState = Object.assign({}, state);
    const storeSetters = new Set();
    const setStoreState = (state) => {
        storeState = Object.assign({}, storeState, state);
        storeSetters.forEach((setter) => setter(storeState));
    };
    function useStore() {
        const [state, setState] = React.useState(storeState);
        React.useEffect(() => () => storeSetters.delete(setState), []);
        storeSetters.add(setState);
        return [state, setStoreState];
    }
    return useStore;
}
exports.createStore = createStore;
