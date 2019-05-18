export declare function createPageControls(loop?: boolean): (props?: any) => {
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
