import { Product } from "../types";

export const products: Product[] = [
  { 
    id: 1, 
    slug: "rosas-luxury-rojas", 
    name: "Ramo de Rosas Luxury Rojas", 
    basePrice: 45990, 
    category: "Rosas", 
    image: "https://images.unsplash.com/photo-1548849170-e622d4f92330?q=80&w=800&auto=format&fit=crop",
    description: "Un arreglo artesanal con las rosas rojas más frescas importadas, diseñado para cautivar y expresar amor profundo.",
    stock: 15
  },
  { 
    id: 2, 
    slug: "rosas-pink-premium", 
    name: "Rosas Pink Premium", 
    basePrice: 42990, 
    category: "Rosas", 
    image: "https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=800&auto=format&fit=crop",
    description: "Elegantes rosas rosadas de tallo largo, perfectas para celebrar la amistad o la ternura.",
    stock: 12
  },
  { 
    id: 3, 
    slug: "girasoles-radiantes", 
    name: "Girasoles Radiantes", 
    basePrice: 28500, 
    category: "Girasoles", 
    image: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?q=80&w=800&auto=format&fit=crop",
    description: "La alegría del verano en un solo ramo. Girasoles vibrantes que iluminan cualquier espacio.",
    stock: 10
  },
  { 
    id: 4, 
    slug: "tulipanes-elegance-mix", 
    name: "Tulipanes Elegance Mix", 
    basePrice: 38000, 
    category: "Tulipanes", 
    image: "https://images.unsplash.com/photo-1520323232431-16722bcc7158?q=80&w=800&auto=format&fit=crop",
    description: "Elegancia pura con tulipanes seleccionados en una combinación de colores vibrantes.",
    stock: 8
  },
  { 
    id: 5, 
    slug: "astromelias-campo", 
    name: "Astromelias de Campo", 
    basePrice: 22000, 
    category: "Mix", 
    image: "https://images.unsplash.com/photo-1596733230638-3486ec454a85?q=80&w=800&auto=format&fit=crop",
    description: "Un ramo fresco y duradero, ideal para decorar el hogar con un toque natural.",
    stock: 25
  },
  { 
    id: 6, 
    slug: "gerberas-sol-brillante", 
    name: "Gerberas Sol Brillante", 
    basePrice: 24990, 
    category: "Mix", 
    image: "https://images.unsplash.com/photo-1596003901066-61be212239bb?q=80&w=800&auto=format&fit=crop",
    description: "Color y energía para celebrar la vida. Un bouquet lleno de vitalidad y frescura.",
    stock: 20
  },
  { 
    id: 7, 
    slug: "mix-premium-boutique", 
    name: "Mix Premium Boutique", 
    basePrice: 55000, 
    category: "Mix", 
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop",
    description: "Nuestra creación más exclusiva. Una armonía de rosas, tulipanes y flores de estación.",
    stock: 5
  },
  { 
    id: 8, 
    slug: "tulipanes-blanco-puro", 
    name: "Tulipanes Blanco Puro", 
    basePrice: 35000, 
    category: "Tulipanes", 
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format&fit=crop",
    description: "Símbolo de pureza y sofisticación. Tulipanes blancos importados de calidad superior.",
    stock: 6
  },
  {
    id: 9,
    slug: "lirios-blancos-serenos",
    name: "Lirios Blancos Serenos",
    basePrice: 32000,
    category: "Lirios",
    image: "https://images.unsplash.com/photo-1508784411316-02b8cddec60a?q=80&w=800&auto=format&fit=crop",
    description: "Fragancia y elegancia en cada pétalo. Los lirios blancos son perfectos para transmitir paz.",
    stock: 15
  },
  {
    id: 10,
    slug: "corazon-rosas-pasion",
    name: "Corazón de Rosas Pasión",
    basePrice: 65000,
    category: "Rosas",
    image: "https://images.unsplash.com/photo-1525310238804-77174dbf7797?q=80&w=800&auto=format&fit=crop",
    description: "Un diseño en forma de corazón con las mejores rosas para declarar tu amor eterno.",
    stock: 4
  },
  {
    id: 11,
    slug: "girasoles-alegres-duo",
    name: "Dúo Girasoles Alegres",
    basePrice: 15990,
    category: "Girasoles",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=800&auto=format&fit=crop",
    description: "Dos girasoles grandes acompañados de follaje fino, perfectos para alegrar el día.",
    stock: 20
  },
  {
    id: 12,
    slug: "caja-flores-mix-pastel",
    name: "Flower Box Mix Pastel",
    basePrice: 58000,
    category: "Mix",
    image: "https://images.unsplash.com/photo-1519378018457-4c29a3a24245?q=80&w=800&auto=format&fit=crop",
    description: "Una lujosa caja con una selección de flores en tonos pastel, ideal para regalos corporativos.",
    stock: 7
  },
  {
    id: 13,
    slug: "tulipanes-rojos-pasion",
    name: "Tulipanes Rojos Pasión",
    basePrice: 32000,
    category: "Tulipanes",
    image: "https://images.unsplash.com/photo-1520698183186-0615468d374f?q=80&w=800&auto=format&fit=crop",
    description: "La intensidad del color rojo en tulipanes importados de Holanda.",
    stock: 12
  },
  {
    id: 14,
    slug: "canasta-primavera-mix",
    name: "Canasta Primavera Mix",
    basePrice: 48000,
    category: "Mix",
    image: "https://images.unsplash.com/photo-1554522723-b2a47bd17684?q=80&w=800&auto=format&fit=crop",
    description: "Una canasta rústica llena de color y vida con las mejores flores de la estación.",
    stock: 9
  },
  {
    id: 15,
    slug: "rosas-blancas-eternidad",
    name: "Rosas Blancas Eternidad",
    basePrice: 45000,
    category: "Rosas",
    image: "https://images.unsplash.com/photo-1574765954605-7f9999026402?q=80&w=800&auto=format&fit=crop",
    description: "Un ramo majestuoso de rosas blancas que simboliza la pureza y el respeto.",
    stock: 10
  },
  {
    id: 16,
    slug: "orquideas-phalaenopsis",
    name: "Orquídea Phalaenopsis",
    basePrice: 42000,
    category: "Mix",
    image: "https://images.unsplash.com/photo-1534888062547-6691459a9307?q=80&w=800&auto=format&fit=crop",
    description: "Elegancia exótica y duradera. Una orquídea blanca de dos varas en maceta premium.",
    stock: 5
  },
  {
    id: 17,
    slug: "gerberas-arcoiris",
    name: "Gerberas Arcoíris",
    basePrice: 28000,
    category: "Mix",
    image: "https://images.unsplash.com/photo-1596733230638-3486ec454a85?q=80&w=800&auto=format&fit=crop",
    description: "Una explosión de colores vibrantes para celebrar los momentos más alegres.",
    stock: 18
  },
  {
    id: 18,
    slug: "rosas-vintage-lilac",
    name: "Rosas Vintage Lilac",
    basePrice: 48990,
    category: "Rosas",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop",
    description: "Rosas en tonos lilas y lavanda con un toque vintage, sumamente románticas.",
    stock: 6
  },
  {
    id: 19,
    slug: "margaritas-campo-fresco",
    name: "Margaritas de Campo",
    basePrice: 19990,
    category: "Mix",
    image: "https://images.unsplash.com/photo-1626019550796-0335cd8e6840?q=80&w=800&auto=format&fit=crop",
    description: "Simplicidad y frescura natural. Ideales para iluminar el día de alguien especial.",
    stock: 30
  },
  {
    id: 20,
    slug: "girasoles-premium-set",
    name: "Set Girasoles Premium",
    basePrice: 52000,
    category: "Girasoles",
    image: "https://images.unsplash.com/photo-1498651457499-dced52bca1c1?q=80&w=800&auto=format&fit=crop",
    description: "12 girasoles gigantes importados, seleccionados por su tamaño y luminosidad.",
    stock: 8
  }
];
