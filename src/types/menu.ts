export interface MenuItem {
  id: string;
  label: string;
  items: string[];
}

export interface LowerThirdData {
  type: 'One Line' | 'Two Line' | 'Courtesy';
  text?: string;
}

export interface MEBox {
  id: string;
  label: string;
  selectedSource: any;
}

export interface SideMenuItem {
  id: string;
  label: string;
  items?: Array<{
    id: string;
    label: string;
    hasLR?: boolean;
    hasLevel?: boolean;
    previewImage?: string;
    duration?: string;
    lowerThirds?: LowerThirdData[];
    type?: string;
    selectedSource?: any;
    layout?: '1-box' | '2-split' | '3-split' | '4-grid' | '2-split-vertical';
    boxes?: MEBox[];
  }>;
}