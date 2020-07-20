export interface LoadSelector<T = any> {
  selector: string;
  component: LoadSelectorPropComponent<T>;
  module?: LoadSelectorPropComponent<T>;
}

export type LoadSelectorPropComponent<T = any> = () => Promise<T>;
