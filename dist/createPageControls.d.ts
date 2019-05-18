/**
 * # createPageControls
 * Create a unique `usePageControls` hook.
 * ```

// Without options
const usePageControls = createPageControls()

// With options
const usePageControls = createPageControls({
  loop: true,
  currentPage: 3,
  history: [1, 0, 2, 0, 1],
})
```
 */
export declare function createPageControls(options?: {
    currentPage?: number;
    loop?: boolean;
    history?: number[];
}): (props?: any) => {
    pages: any[];
    currentPage: number;
    totalPages: number;
    progress: number;
    history: number[];
    nextPage: (direction?: "left" | "right") => number;
    previousPage: () => number;
    snapToNextPage: (direction?: "left" | "right") => void;
    snapToPage: (index?: number) => void;
    snapToPreviousPage: () => void;
    snapToProgress: (progress: number) => void;
    onChangePage: (currentPage: number) => void;
};
