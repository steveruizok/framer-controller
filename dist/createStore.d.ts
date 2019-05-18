export declare function createStore<T>(state: T): () => [T, (state: Partial<T>) => void];
