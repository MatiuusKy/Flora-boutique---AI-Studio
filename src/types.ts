
export type FlowerType = 'Rosas' | 'Astromelias' | 'Tulipanes' | 'Girasoles' | 'Gerberas' | 'Mix' | 'Lirios';

export interface ProductSize {
  label: string;
  value: string;
  extraPrice: number;
  description: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: number | string;
  slug: string;
  name: string;
  basePrice: number;
  category: FlowerType;
  image: string;
  description: string;
  stock: number;
}

export const FLOWER_SIZES: Record<FlowerType, ProductSize[]> = {
  'Rosas': [
    { label: 'XS', value: '10-varas', extraPrice: 0, description: '10 Varas' },
    { label: 'S', value: '20-varas', extraPrice: 15000, description: '20 Varas' },
    { label: 'M', value: '50-varas', extraPrice: 45000, description: '50 Varas' },
    { label: 'L', value: '80-varas', extraPrice: 75000, description: '80 Varas' },
    { label: 'XL', value: '100-varas', extraPrice: 95000, description: '100 Varas' },
  ],
  'Astromelias': [
    { label: 'S', value: '10-varas', extraPrice: 0, description: '10 Varas' },
    { label: 'M', value: '20-varas', extraPrice: 12000, description: '20 Varas' },
    { label: 'L', value: '30-varas', extraPrice: 22000, description: '30 Varas' },
    { label: 'XL', value: '40-varas', extraPrice: 32000, description: '40 Varas' },
  ],
  'Tulipanes': [
    { label: 'S', value: '10-varas', extraPrice: 0, description: '10 Varas' },
    { label: 'M', value: '20-varas', extraPrice: 18000, description: '20 Varas' },
    { label: 'L', value: '30-varas', extraPrice: 34000, description: '30 Varas' },
  ],
  'Girasoles': [
    { label: 'S', value: '10-varas', extraPrice: 0, description: '10 Varas' },
    { label: 'M', value: '20-varas', extraPrice: 14000, description: '20 Varas' },
    { label: 'L', value: '30-varas', extraPrice: 26000, description: '30 Varas' },
  ],
  'Gerberas': [
    { label: 'S', value: '10-varas', extraPrice: 0, description: '10 Varas' },
    { label: 'M', value: '20-varas', extraPrice: 12000, description: '20 Varas' },
    { label: 'L', value: '30-varas', extraPrice: 22000, description: '30 Varas' },
    { label: 'XL', value: '40-varas', extraPrice: 32000, description: '40 Varas' },
  ],
  'Mix': [
    { label: 'S', value: 'Small', extraPrice: 0, description: 'Elegante' },
    { label: 'M', value: 'Medium', extraPrice: 15000, description: 'Premium' },
    { label: 'L', value: 'Large', extraPrice: 30000, description: 'Magnífico' },
  ],
  'Lirios': [
    { label: 'S', value: '6-varas', extraPrice: 0, description: '6 Varas' },
    { label: 'M', value: '12-varas', extraPrice: 15000, description: '12 Varas' },
    { label: 'L', value: '18-varas', extraPrice: 28000, description: '18 Varas' },
  ]
};

export const FLOWER_COLORS: Record<FlowerType, ProductColor[]> = {
  'Rosas': [
    { name: 'Rojo', hex: '#E11D48' },
    { name: 'Rosado', hex: '#FB7185' },
    { name: 'Fucsia', hex: '#DB2777' },
    { name: 'Blanco', hex: '#FFFFFF' },
    { name: 'Amarillo', hex: '#FACC15' },
    { name: 'Damasco', hex: '#FB923C' },
  ],
  'Astromelias': [
    { name: 'Rojo', hex: '#E11D48' },
    { name: 'Rosado', hex: '#FB7185' },
    { name: 'Fucsia', hex: '#DB2777' },
    { name: 'Blanco', hex: '#FFFFFF' },
    { name: 'Amarillo', hex: '#FACC15' },
    { name: 'Naranjo', hex: '#EA580C' },
    { name: 'Morado', hex: '#9333EA' },
    { name: 'Lila', hex: '#C084FC' },
  ],
  'Tulipanes': [
    { name: 'Rojo', hex: '#E11D48' },
    { name: 'Rosado', hex: '#FB7185' },
    { name: 'Blanco', hex: '#FFFFFF' },
    { name: 'Amarillo', hex: '#FACC15' },
    { name: 'Naranjo', hex: '#EA580C' },
    { name: 'Morado', hex: '#9333EA' },
  ],
  'Girasoles': [
    { name: 'Amarillo', hex: '#FACC15' },
  ],
  'Gerberas': [
    { name: 'Rojo', hex: '#E11D48' },
    { name: 'Rosado', hex: '#FB7185' },
    { name: 'Fucsia', hex: '#DB2777' },
    { name: 'Naranjo', hex: '#EA580C' },
  ],
  'Mix': [],
  'Lirios': [
    { name: 'Blanco', hex: '#FFFFFF' },
    { name: 'Rosado', hex: '#FB7185' },
    { name: 'Amarillo', hex: '#FACC15' },
  ]
};
