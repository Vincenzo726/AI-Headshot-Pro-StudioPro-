export interface HeadshotStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
  previewUrl: string;
}

export interface BackgroundOption {
  id: string;
  name: string;
  description: string;
  prompt: string;
  previewUrl: string;
}

export interface BackgroundCategory {
  id: string;
  name: string;
  options: BackgroundOption[];
}

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate-grey',
    name: 'Corporate Grey',
    description: 'Classic professional grey studio backdrop.',
    prompt: 'professional corporate headshot, neutral grey studio background, soft studio lighting, high-end business attire, sharp focus, LinkedIn profile style',
    previewUrl: 'https://picsum.photos/seed/corp-grey/400/400'
  },
  {
    id: 'tech-office',
    name: 'Modern Tech Office',
    description: 'Bright, modern office environment with soft bokeh.',
    prompt: 'professional headshot in a modern tech office, blurred office background with glass and plants, natural indoor lighting, smart casual attire, professional and approachable',
    previewUrl: 'https://picsum.photos/seed/tech-office/400/400'
  },
  {
    id: 'outdoor-natural',
    name: 'Outdoor Natural',
    description: 'Natural daylight with a soft blurred park background.',
    prompt: 'professional headshot outdoors, natural sunlight, soft bokeh park background, friendly and professional expression, high quality photography',
    previewUrl: 'https://picsum.photos/seed/outdoor/400/400'
  },
  {
    id: 'executive-dark',
    name: 'Executive Dark',
    description: 'Moody, high-contrast professional studio look.',
    prompt: 'executive headshot, dark textured background, dramatic rim lighting, professional suit, powerful and confident look, high-end photography',
    previewUrl: 'https://picsum.photos/seed/exec-dark/400/400'
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    description: 'Clean white background with vibrant lighting.',
    prompt: 'creative professional headshot, clean white studio background, bright and even lighting, modern professional attire, crisp and clean aesthetic',
    previewUrl: 'https://picsum.photos/seed/creative/400/400'
  }
];

export const BACKGROUND_CATEGORIES: BackgroundCategory[] = [
  {
    id: 'professional-office',
    name: 'Professional Office',
    options: [
      {
        id: 'modern-lobby',
        name: 'Modern Lobby',
        description: 'Sleek glass and marble lobby.',
        prompt: 'modern corporate lobby with glass walls and marble floors, soft natural light, professional atmosphere',
        previewUrl: 'https://picsum.photos/seed/lobby/400/400'
      },
      {
        id: 'boardroom',
        name: 'Executive Boardroom',
        description: 'High-end boardroom with wooden table.',
        prompt: 'executive boardroom with a large wooden table and city view through windows, blurred background',
        previewUrl: 'https://picsum.photos/seed/boardroom/400/400'
      },
      {
        id: 'open-office',
        name: 'Open Workspace',
        description: 'Collaborative modern office space.',
        prompt: 'bright open-plan office with modern desks and plants, soft bokeh, collaborative feel',
        previewUrl: 'https://picsum.photos/seed/workspace/400/400'
      }
    ]
  },
  {
    id: 'outdoor-nature',
    name: 'Outdoor Nature',
    options: [
      {
        id: 'city-park',
        name: 'City Park',
        description: 'Green trees and soft sunlight.',
        prompt: 'lush green park with tall trees, soft dappled sunlight, natural and fresh background',
        previewUrl: 'https://picsum.photos/seed/park/400/400'
      },
      {
        id: 'urban-street',
        name: 'Urban Street',
        description: 'Modern city street with bokeh.',
        prompt: 'modern city street with architectural details, soft bokeh city lights, urban professional feel',
        previewUrl: 'https://picsum.photos/seed/urban/400/400'
      },
      {
        id: 'garden-terrace',
        name: 'Garden Terrace',
        description: 'Elegant outdoor terrace.',
        prompt: 'elegant garden terrace with stone walls and flowers, soft natural lighting',
        previewUrl: 'https://picsum.photos/seed/terrace/400/400'
      }
    ]
  },
  {
    id: 'abstract',
    name: 'Abstract',
    options: [
      {
        id: 'geometric-light',
        name: 'Geometric Light',
        description: 'Soft geometric shapes and light.',
        prompt: 'abstract background with soft geometric shapes and subtle light gradients, modern and clean',
        previewUrl: 'https://picsum.photos/seed/abstract-geo/400/400'
      },
      {
        id: 'bokeh-blue',
        name: 'Blue Bokeh',
        description: 'Professional blue light circles.',
        prompt: 'abstract blue bokeh background with soft light circles, professional and tech-focused',
        previewUrl: 'https://picsum.photos/seed/bokeh-blue/400/400'
      },
      {
        id: 'textured-wall',
        name: 'Textured Wall',
        description: 'Subtle concrete or plaster texture.',
        prompt: 'subtle textured concrete wall background, minimalist and professional',
        previewUrl: 'https://picsum.photos/seed/texture/400/400'
      }
    ]
  },
  {
    id: 'studio-solid',
    name: 'Studio Solid Colors',
    options: [
      {
        id: 'solid-navy',
        name: 'Navy Blue',
        description: 'Classic navy studio backdrop.',
        prompt: 'solid navy blue studio backdrop, professional and authoritative',
        previewUrl: 'https://picsum.photos/seed/navy/400/400'
      },
      {
        id: 'solid-white',
        name: 'Pure White',
        description: 'Clean high-key white background.',
        prompt: 'pure white high-key studio background, clean and bright',
        previewUrl: 'https://picsum.photos/seed/white/400/400'
      },
      {
        id: 'solid-charcoal',
        name: 'Charcoal Grey',
        description: 'Deep grey professional backdrop.',
        prompt: 'solid charcoal grey studio backdrop, sophisticated and modern',
        previewUrl: 'https://picsum.photos/seed/charcoal/400/400'
      }
    ]
  }
];
