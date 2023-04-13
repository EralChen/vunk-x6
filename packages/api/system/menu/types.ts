
export interface MenuButton {
  buttonId: string;
  buttonName?: string;
  label: string;
}

export interface Menu {
  hideClose: number;
  modelId: string;
  display: 0 | 1;
  icon: string;
  tree: string;
  dir: string;
  path: string;
  component: string;
  parentMenuId: string;
  name: string;
  menuId: string;
  id: string;
  seq: number;

  pId?: string;
  buttons?: MenuButton[];
  children?: Menu[];
}