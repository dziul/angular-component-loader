export interface LoadTarget<T = any> {
  target?: string;
  component?: LoadTargetPropComponent<T>;
}

export type LoadTargetPropComponent<T = any> = () => Promise<T>;
