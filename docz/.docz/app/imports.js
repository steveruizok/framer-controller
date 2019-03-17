export const imports = {
  'src/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-index" */ 'src/index.mdx'),
  'src/controllers/BuildYourOwn.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-controllers-build-your-own" */ 'src/controllers/BuildYourOwn.mdx'),
  'src/controllers/Controller.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-controllers-controller" */ 'src/controllers/Controller.mdx'),
  'src/controllers/CounterController.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-controllers-counter-controller" */ 'src/controllers/CounterController.mdx'),
  'src/controllers/FetchController.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-controllers-fetch-controller" */ 'src/controllers/FetchController.mdx'),
  'src/controllers/FormController.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-controllers-form-controller" */ 'src/controllers/FormController.mdx'),
  'src/controllers/IndexController.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-controllers-index-controller" */ 'src/controllers/IndexController.mdx'),
  'src/controllers/IntervalController.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-controllers-interval-controller" */ 'src/controllers/IntervalController.mdx'),
  'src/controllers/PageController.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-controllers-page-controller" */ 'src/controllers/PageController.mdx'),
  'src/controllers/PlacesController.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-controllers-places-controller" */ 'src/controllers/PlacesController.mdx'),
  'src/controllers/SelectionController.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-controllers-selection-controller" */ 'src/controllers/SelectionController.mdx'),
}
