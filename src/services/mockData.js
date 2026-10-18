// Rich fallback and initial dataset for e-commerce store with dedicated category posters and subcategories
export const MOCK_CATEGORIES = [
  {
    id: 'all',
    name: 'All Collections',
    tag: 'Spring Drop 2026',
    poster: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    description: 'Explore the full spectrum of premium electronics, fine scents & modern living.',
    subCategories: [],
  },
  {
    id: 'smartphones',
    name: 'Smartphones & Tech',
    tag: 'Flagship Mobile',
    poster: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80',
    description: 'Flagship titanium devices with breakthrough cameras and generative AI.',
    subCategories: [
      { id: 'all', name: 'All Tech' },
      { id: 'smartphones', name: 'Smartphones' },
      { id: 'tablets', name: 'Tablets' },
      { id: 'mobile-accessories', name: 'Accessories' },
    ],
  },
  {
    id: 'laptops',
    name: 'Laptops & Workstations',
    tag: 'Pro Performance',
    poster: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    description: 'Silicon powerhouses crafted for creative and demanding workloads.',
    subCategories: [
      { id: 'all', name: 'All Laptops' },
      { id: 'laptops', name: 'Pro Notebooks' },
      { id: 'tablets', name: 'Convertibles' },
    ],
  },
  {
    id: 'audio',
    name: 'Audio & Acoustics',
    tag: 'Immersive Spatial',
    poster: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    description: 'World-class active noise cancellation and high-fidelity studio acoustics.',
    subCategories: [
      { id: 'all', name: 'All Audio' },
      { id: 'headphones', name: 'Over-Ear Headphones' },
      { id: 'earbuds', name: 'Wireless Earbuds' },
      { id: 'speakers', name: 'Speakers' },
    ],
  },
  {
    id: 'watches',
    name: 'Watches & Chronos',
    tag: 'Timeless Precision',
    poster: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
    description: 'Automatic mechanical horology and rugged sapphire smart timepieces.',
    subCategories: [
      { id: 'all', name: 'All Watches' },
      { id: 'mens-watches', name: "Men's Timepieces" },
      { id: 'womens-watches', name: "Women's Watches" },
    ],
  },
  {
    id: 'fragrances',
    name: 'Artisan Fragrances',
    tag: 'Signature Aromas',
    poster: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
    description: 'Captivating parfum trails composed with woody, ambery and oriental accords.',
    subCategories: [
      { id: 'all', name: 'All Fragrances' },
      { id: 'fragrances', name: 'Eau de Parfum' },
    ],
  },
  {
    id: 'skincare',
    name: 'Clinical Skincare',
    tag: 'Clean Formulations',
    poster: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=80',
    description: 'Dermatologist tested barrier repair serums and hydration therapies.',
    subCategories: [
      { id: 'all', name: 'All Skincare' },
      { id: 'skin-care', name: 'Serums & Cleansers' },
      { id: 'beauty', name: 'Beauty & Glow' },
    ],
  },
  {
    id: 'home-decoration',
    name: 'Home Decor & Living',
    tag: 'Architectural Design',
    poster: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=1000&q=80',
    description: 'Handcrafted ceramic pieces, ambient projection lighting & modern spaces.',
    subCategories: [
      { id: 'all', name: 'All Home' },
      { id: 'home-decoration', name: 'Living & Decor' },
      { id: 'furniture', name: 'Designer Furniture' },
      { id: 'kitchen-accessories', name: 'Dining & Kitchen' },
    ],
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    tag: 'Tailored Luxury',
    poster: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    description: 'Extra-fine merino wool knitwear and handcrafted Italian leather footwear.',
    subCategories: [
      { id: 'all', name: 'All Fashion' },
      { id: 'mens-shirts', name: "Men's Apparel" },
      { id: 'womens-dresses', name: "Women's Dresses" },
      { id: 'shoes', name: 'Footwear' },
      { id: 'bags', name: 'Bags & Purses' },
      { id: 'accessories', name: 'Jewelry & Sunglasses' },
    ],
  },
];

export const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "iPhone 15 Pro Max - 256GB Titanium",
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip, customizable Action button, and the most powerful iPhone camera system ever with 5x optical zoom.",
    price: 1199,
    discountPercentage: 8,
    rating: 4.89,
    ratingCount: 324,
    stock: 24,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    specs: {
      Display: "6.7-inch Super Retina XDR OLED",
      Processor: "A17 Pro Chip",
      Storage: "256GB NVMe",
      Camera: "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto",
      Battery: "Up to 29 hours video playback"
    },
    reviews: [
      { id: 101, user: "Alex Mercer", rating: 5, comment: "Titanium feels featherlight yet durable. Camera is unmatched!", date: "2026-03-12" },
      { id: 102, user: "Sarah Jenkins", rating: 5, comment: "Action button is super convenient. Battery lasts two full days.", date: "2026-03-02" }
    ]
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra AI Edition",
    description: "Meet Galaxy S24 Ultra with Galaxy AI. New titanium exterior, flat 6.8-inch display, built-in S Pen, and 200MP camera with revolutionary ProVisual Engine.",
    price: 1299,
    discountPercentage: 12,
    rating: 4.82,
    ratingCount: 280,
    stock: 18,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    specs: {
      Display: "6.8-inch Dynamic AMOLED 2X 120Hz",
      Processor: "Snapdragon 8 Gen 3 for Galaxy",
      Storage: "512GB",
      Camera: "200MP Quad Tele System",
      Features: "S-Pen built-in, Galaxy AI Live Translate"
    },
    reviews: [
      { id: 103, user: "David Chen", rating: 5, comment: "The AI live translation and note assist are game changers for work.", date: "2026-02-18" }
    ]
  },
  {
    id: 3,
    title: "MacBook Pro 16\" M3 Max Silicon",
    description: "The most advanced Mac laptop ever for demanding workflows. Blazing fast M3 Max chip with 16-core CPU, 40-core GPU, Liquid Retina XDR display and 22-hour battery life.",
    price: 3499,
    discountPercentage: 5,
    rating: 4.95,
    ratingCount: 195,
    stock: 12,
    brand: "Apple",
    category: "laptops",
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    specs: {
      Display: "16.2-inch Liquid Retina XDR 120Hz ProMotion",
      Processor: "Apple M3 Max (16 CPU / 40 GPU)",
      RAM: "48GB Unified Memory",
      Storage: "1TB Ultra-fast SSD",
      Battery: "100Wh, up to 22 hours"
    },
    reviews: [
      { id: 104, user: "Elena Rostova", rating: 5, comment: "Renders 8K ProRes footage without even turning the fans on. Unreal power.", date: "2026-01-28" }
    ]
  },
  {
    id: 4,
    title: "Dell XPS 15 OLED InfinityEdge",
    description: "High performance creator laptop packed with 13th Gen Intel Core i9, NVIDIA RTX 4070 Graphics, and breathtaking 3.5K OLED touch display.",
    price: 2199,
    discountPercentage: 15,
    rating: 4.71,
    ratingCount: 142,
    stock: 15,
    brand: "Dell",
    category: "laptops",
    thumbnail: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    specs: {
      Display: "15.6-inch 3.5K (3456x2160) OLED Touch",
      Processor: "Intel Core i9-13900H",
      GPU: "NVIDIA GeForce RTX 4070 8GB GDDR6",
      RAM: "32GB DDR5 4800MHz",
      Storage: "1TB PCIe NVMe SSD"
    },
    reviews: [
      { id: 105, user: "Marcus Vance", rating: 4, comment: "Gorgeous screen. Excellent keyboard and trackpad.", date: "2026-02-14" }
    ]
  },
  {
    id: 5,
    title: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading active noise canceling with two processors and 8 microphones. Magnificent high-resolution audio and crystal-clear hands-free calling.",
    price: 398,
    discountPercentage: 20,
    rating: 4.88,
    ratingCount: 610,
    stock: 35,
    brand: "Sony",
    category: "audio",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    specs: {
      Type: "Over-Ear Wireless",
      NoiseCancellation: "Dual Processor V1 & QN1 Auto NC",
      BatteryLife: "30 Hours with ANC on",
      Connectivity: "Bluetooth 5.2, Multipoint, LDAC",
      Weight: "250g"
    },
    reviews: [
      { id: 106, user: "Jessica Miller", rating: 5, comment: "Silences plane cabin noise completely. The most comfortable headphones I own.", date: "2026-03-01" }
    ]
  },
  {
    id: 6,
    title: "Bose QuietComfort Ultra Earbuds",
    description: "World-class noise cancellation, breakthrough spatialized audio with Bose Immersive Audio, and custom fit technology for unmatched comfort.",
    price: 299,
    discountPercentage: 10,
    rating: 4.65,
    ratingCount: 184,
    stock: 22,
    brand: "Bose",
    category: "audio",
    thumbnail: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    specs: {
      ANC: "CustomTune Sound Calibration",
      SpatialAudio: "Bose Immersive Audio Modes",
      Battery: "6 hours per charge (24 hours total with case)",
      WaterResistance: "IPX4"
    },
    reviews: [
      { id: 107, user: "Tom Riley", rating: 5, comment: "Deep, punchy bass and spatial audio that surrounds your head naturally.", date: "2026-02-22" }
    ]
  },
  {
    id: 7,
    title: "Apple Watch Ultra 2 GPS + Cellular",
    description: "The most rugged and capable Apple Watch. 49mm titanium case, precision dual-frequency GPS, up to 36 hours of battery life, and 3000 nits display brightness.",
    price: 799,
    discountPercentage: 6,
    rating: 4.91,
    ratingCount: 220,
    stock: 14,
    brand: "Apple",
    category: "watches",
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    specs: {
      Case: "49mm Aerospace-grade Titanium",
      Display: "Always-On Retina Sapphire Crystal 3000 nits",
      WaterResistance: "100m, certified EN13319 dive computer",
      Sensors: "ECG, Blood Oxygen, Depth Gauge, Temperature"
    },
    reviews: [
      { id: 108, user: "Liam Walker", rating: 5, comment: "Perfect for marathon training and mountaineering. The brightest screen ever.", date: "2026-03-05" }
    ]
  },
  {
    id: 8,
    title: "Seiko Prospex Automatic Diver's Watch",
    description: "Iconic Japanese automatic dive timepiece featuring mechanical caliber 4R36, 200m water resistance, LumiBrite markers, and durable sapphire glass.",
    price: 525,
    discountPercentage: 15,
    rating: 4.79,
    ratingCount: 95,
    stock: 9,
    brand: "Seiko",
    category: "watches",
    thumbnail: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    specs: {
      Movement: "Caliber 4R36 Automatic (41-hr power reserve)",
      CaseMaterial: "Stainless Steel 45mm",
      Glass: "Anti-reflective Sapphire",
      WaterResistance: "200m / 660ft ISO Diver"
    },
    reviews: [
      { id: 109, user: "Hiroshi Sato", rating: 5, comment: "Classic turtle case silhouette. Keeps accurate time right out of the box.", date: "2026-01-19" }
    ]
  },
  {
    id: 9,
    title: "Bleu de Chanel Eau de Parfum 100ml",
    description: "An ode to masculine freedom expressed in an aromatic-woody fragrance with a captivating trail. Notes of citrus, ambery cedar, and New Caledonian sandalwood.",
    price: 165,
    discountPercentage: 0,
    rating: 4.93,
    ratingCount: 520,
    stock: 40,
    brand: "Chanel",
    category: "fragrances",
    thumbnail: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    specs: {
      Volume: "100ml / 3.4 fl oz",
      FragranceFamily: "Woody Aromatic",
      TopNotes: "Grapefruit, Lemon, Mint, Pink Pepper",
      BaseNotes: "Cedar, Sandalwood, Incense, Amber"
    },
    reviews: [
      { id: 110, user: "Julian Croft", rating: 5, comment: "The gold standard of versatile blue scents. Lasts 8+ hours easily.", date: "2026-02-11" }
    ]
  },
  {
    id: 10,
    title: "Maison Margiela REPLICA Jazz Club",
    description: "Warm and spicy fragrance evoking the heady cocktails and cigars of a Brooklyn jazz club with rich notes of rum absolute, vanilla bean, and tobacco leaf.",
    price: 160,
    discountPercentage: 10,
    rating: 4.85,
    ratingCount: 310,
    stock: 25,
    brand: "Maison Margiela",
    category: "fragrances",
    thumbnail: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    specs: {
      Volume: "100ml / 3.4 fl oz",
      FragranceFamily: "Warm & Spicy Oriental",
      KeyNotes: "Pink Pepper, Rum Absolute, Tobacco Leaf, Vanilla"
    },
    reviews: [
      { id: 111, user: "Claire Bennett", rating: 5, comment: "Cozy, boozy, and deeply seductive for evening wear.", date: "2026-03-08" }
    ]
  },
  {
    id: 11,
    title: "Advanced Night Repair Synchronized Multi-Recovery",
    description: "Deeply penetrating serum reduces the look of multiple signs of aging caused by environmental assaults of modern life. Skin looks smoother, less lined, and radiant.",
    price: 115,
    discountPercentage: 15,
    rating: 4.81,
    ratingCount: 440,
    stock: 50,
    brand: "Estée Lauder",
    category: "skincare",
    thumbnail: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    specs: {
      Volume: "50ml",
      SkinType: "All skin types",
      Benefits: "72-hour hydration, 8-hour antioxidant protection",
      Formula: "Oil-free, fragrance-free, hyaluronic acid enriched"
    },
    reviews: [
      { id: 112, user: "Rachel Green", rating: 5, comment: "My skin barrier has completely repaired after 3 weeks of daily night use.", date: "2026-02-27" }
    ]
  },
  {
    id: 12,
    title: "CeraVe Hydrating Facial Cleanser 473ml",
    description: "Gentle facial wash formulated with hyaluronic acid and 3 essential ceramides (1, 3, 6-II) that cleanse, hydrate, and maintain the skin's natural barrier.",
    price: 19,
    discountPercentage: 5,
    rating: 4.75,
    ratingCount: 920,
    stock: 80,
    brand: "CeraVe",
    category: "skincare",
    thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    specs: {
      Volume: "473ml / 16 fl oz",
      KeyIngredients: "Ceramides 1, 3, 6-II, Hyaluronic Acid",
      Attributes: "Non-comedogenic, non-irritating, fragrance-free"
    },
    reviews: [
      { id: 113, user: "Daniel Craig", rating: 5, comment: "Does not strip moisture. Perfect daily cleanser.", date: "2026-03-01" }
    ]
  },
  {
    id: 13,
    title: "Minimalist Scandinavian Ceramic Vase Set",
    description: "Set of 3 handcrafted matte ceramic vases in muted earth tones. Designed to bring minimalist architectural elegance and warmth into any living space.",
    price: 68,
    discountPercentage: 12,
    rating: 4.67,
    ratingCount: 118,
    stock: 30,
    brand: "Nordic Living",
    category: "home-decoration",
    thumbnail: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    specs: {
      Material: "High-fired Terracotta & Porcelain",
      Finish: "Hand-applied Matte Powder Glaze",
      Sizes: "Large (24cm), Medium (18cm), Small (12cm)",
      Care: "Wipe with damp cloth"
    },
    reviews: [
      { id: 114, user: "Sophia Loren", rating: 5, comment: "The textures and shapes look like art gallery pieces in our living room.", date: "2026-01-30" }
    ]
  },
  {
    id: 14,
    title: "Ambient Sunset LED Projection Lamp",
    description: "16-color rotating sunset projection light with remote and app control. Creates therapeutic golden hour ambience for photography, relaxation, and bedroom aesthetics.",
    price: 34,
    discountPercentage: 25,
    rating: 4.54,
    ratingCount: 390,
    stock: 45,
    brand: "Lumina",
    category: "home-decoration",
    thumbnail: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    specs: {
      Power: "10W USB Powered",
      Colors: "16 Colors + 4 Dynamic Lighting Modes",
      Rotation: "180-degree optical glass lens",
      Features: "Smart App Control + Wireless Remote"
    },
    reviews: [
      { id: 115, user: "Chloe Adams", rating: 4, comment: "Super vibrant colors and the app schedule feature is great.", date: "2026-02-19" }
    ]
  },
  {
    id: 15,
    title: "Premium Merino Wool Oversized Knit Sweater",
    description: "Ethically sourced 100% extra-fine Merino wool knitted in a relaxed ribbed silhouette. Ultra-soft against the skin, breathable, and naturally temperature regulating.",
    price: 145,
    discountPercentage: 10,
    rating: 4.86,
    ratingCount: 160,
    stock: 20,
    brand: "Atelier Mode",
    category: "fashion",
    thumbnail: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    specs: {
      Material: "100% Extra-fine Australian Merino Wool",
      Fit: "Relaxed Boxy Fit with Drop Shoulder",
      Origin: "Crafted in Portugal",
      Care: "Hand wash cold or dry clean"
    },
    reviews: [
      { id: 116, user: "Oliver Smith", rating: 5, comment: "Heavyweight, luxurious handfeel without any scratchiness.", date: "2026-03-04" }
    ]
  },
  {
    id: 16,
    title: "Classic Italian Leather Minimalist Sneaker",
    description: "Handcrafted low-top sneakers in buttery full-grain Italian calf leather with Margom rubber soles, waxed cotton laces, and plush memory foam insoles.",
    price: 185,
    discountPercentage: 18,
    rating: 4.78,
    ratingCount: 215,
    stock: 16,
    brand: "Koio Milano",
    category: "fashion",
    thumbnail: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    specs: {
      Upper: "Full-Grain Italian Nappa Leather",
      Sole: "Custom Margom Vulcanized Rubber",
      Lining: "Vegetable-tanned leather lining",
      Insole: "Removable contoured orthotic foam"
    },
    reviews: [
      { id: 117, user: "Anthony Hall", rating: 5, comment: "Cleaner silhouette than Common Projects at half the price.", date: "2026-02-28" }
    ]
  }
];
