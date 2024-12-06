import { MenuItem, SideMenuItem } from '../types/menu';

export const menuItems: MenuItem[] = [
  {
    id: 'transition',
    label: 'Transition',
    items: ['MIX', 'SLOW MIX', 'CUT', 'WIPE OUT', 'STINGER', 'END CAP', 'BREAKING NEWS', 'TOP STORIES', 'SPORTS BUMP'],
  },
  {
    id: 'scte',
    label: 'SCTE',
    items: ['START SHOW', 'END SHOW', '2:00 BREAK', '2:30 BREAK', 'REPEAT', '3:00 BREAK', '1:30 BREAK', '1:00 BREAK', ':30 BREAK'],
  },
  {
    id: 'auto-advance',
    label: 'Auto-Advance',
    items: ['MANUAL', 'ADVANCE', 'PAUSE'],
  },
  {
    id: 'grfx',
    label: 'GRFX',
    items: [], // Empty array as items will be fetched from Singular API
  },
];

const audioSources = [
  { id: 'source1', label: 'Source 1', previewImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81' },
  { id: 'source2', label: 'Source 2', previewImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d' },
  { id: 'source3', label: 'Source 3', previewImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085' },
  { id: 'source4', label: 'Source 4', previewImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c' },
  { id: 'source5', label: 'Source 5', previewImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b' },
  { id: 'source6', label: 'Source 6', previewImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6' },
  { id: 'source7', label: 'Source 7', previewImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7' },
  { id: 'source8', label: 'Source 8', previewImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81' },
  { id: 'source9', label: 'Source 9', previewImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d' },
  { id: 'source10', label: 'Source 10', previewImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085' },
  { id: 'source11', label: 'Source 11', previewImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c' }
];

export const sideMenuItems: SideMenuItem[] = [
  { 
    id: 'source', 
    label: 'SOURCE',
    items: audioSources
  },
  { 
    id: 'audio', 
    label: 'AUDIO',
    items: audioSources.map(source => ({
      ...source,
      hasLR: true
    }))
  },
  { id: 'ptz', label: 'PTZ' },
  { id: 'grfx', label: 'GRFX' },
  { 
    id: 'clips', 
    label: 'CLIPS',
    items: [
      { 
        id: 'clip1', 
        label: 'Big Buck Bunny',
        previewImage: '/placeholder.svg',
        duration: '00:30:00',
        lowerThirds: []
      },
      { 
        id: 'clip2', 
        label: 'Nature Documentary',
        previewImage: '/photo-1649972904349-6e44c42644a7',
        duration: '01:05:29',
        lowerThirds: []
      },
      { 
        id: 'clip3', 
        label: 'Tech Review',
        previewImage: '/photo-1488590528505-98d2b5aba04b',
        duration: '00:31:04',
        lowerThirds: []
      }
    ]
  },
  { 
    id: 'me', 
    label: 'ME',
    items: [
      {
        id: 'me1',
        label: 'ME Box 1',
        type: 'box',
        previewImage: null,
        selectedSource: null
      },
      {
        id: 'me2',
        label: 'ME Box 2',
        type: 'box',
        previewImage: null,
        selectedSource: null
      }
    ]
  },
  { id: 'l3', label: 'L3' },
  { id: 'ext-dev', label: 'EXT DEV' },
  { 
    id: 'music', 
    label: 'MUSIC',
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `track${i + 1}`,
      label: `Track ${i + 1}`,
      hasLevel: true
    }))
  }
];