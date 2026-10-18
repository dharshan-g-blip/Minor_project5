import { MOCK_PRODUCTS, MOCK_CATEGORIES } from './mockData';

const BASE_URL = 'https://dummyjson.com/products';

/**
 * Normalizes product object and classifies it into unified departments and subcategories
 */
function normalizeProduct(p) {
  const discountPercentage = Math.round(p.discountPercentage || 10);
  const originalPrice = discountPercentage > 0 
    ? Math.round(p.price / (1 - discountPercentage / 100)) 
    : p.price;

  const rawCat = (p.category || '').toLowerCase().trim();
  const titleAndDesc = `${p.title || ''} ${p.description || ''}`.toLowerCase();

  let primaryCat = 'fashion';
  let subCat = rawCat;

  // 1. Audio detection
  if (
    titleAndDesc.includes('headphone') ||
    titleAndDesc.includes('earbud') ||
    titleAndDesc.includes('airpod') ||
    titleAndDesc.includes('speaker') ||
    titleAndDesc.includes('audio') ||
    titleAndDesc.includes('soundbar')
  ) {
    primaryCat = 'audio';
    subCat = titleAndDesc.includes('headphone')
      ? 'headphones'
      : titleAndDesc.includes('earbud') || titleAndDesc.includes('airpod')
      ? 'earbuds'
      : 'speakers';
  }
  // 2. Smartphones & Mobile Tech
  else if (rawCat.includes('smartphone') || rawCat.includes('mobile') || rawCat.includes('tablet')) {
    primaryCat = 'smartphones';
    subCat = rawCat.includes('tablet')
      ? 'tablets'
      : rawCat.includes('access')
      ? 'mobile-accessories'
      : 'smartphones';
  }
  // 3. Laptops & PCs
  else if (rawCat.includes('laptop')) {
    primaryCat = 'laptops';
    subCat = 'laptops';
  }
  // 4. Watches
  else if (rawCat.includes('watch')) {
    primaryCat = 'watches';
    subCat = rawCat.includes('women') ? 'womens-watches' : 'mens-watches';
  }
  // 5. Fragrances
  else if (rawCat.includes('fragrance') || rawCat.includes('perfume')) {
    primaryCat = 'fragrances';
    subCat = 'fragrances';
  }
  // 6. Skincare & Beauty
  else if (rawCat.includes('skin') || rawCat.includes('beauty')) {
    primaryCat = 'skincare';
    subCat = rawCat.includes('skin') ? 'skin-care' : 'beauty';
  }
  // 7. Home Decor & Living
  else if (rawCat.includes('home') || rawCat.includes('furnitur') || rawCat.includes('kitchen')) {
    primaryCat = 'home-decoration';
    subCat = rawCat.includes('furnitur')
      ? 'furniture'
      : rawCat.includes('kitchen')
      ? 'kitchen-accessories'
      : 'home-decoration';
  }
  // 8. Fashion & Apparel
  else {
    primaryCat = 'fashion';
    if (rawCat.includes('shoe')) subCat = 'shoes';
    else if (rawCat.includes('bag')) subCat = 'bags';
    else if (rawCat.includes('jewel') || rawCat.includes('sunglass')) subCat = 'accessories';
    else if (rawCat.includes('dress')) subCat = 'womens-dresses';
    else subCat = 'mens-shirts';
  }

  return {
    id: p.id,
    title: p.title || 'Product Title',
    description: p.description || 'No description provided for this item.',
    price: Number(p.price) || 0,
    originalPrice,
    discountPercentage,
    rating: Number(p.rating) || 4.5,
    ratingCount: p.ratingCount || Math.floor(Math.random() * 200) + 50,
    stock: typeof p.stock === 'number' ? p.stock : 25,
    brand: p.brand || 'Unbranded',
    category: primaryCat,
    subCategory: subCat,
    originalCategory: rawCat,
    thumbnail: p.thumbnail || p.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    images: Array.isArray(p.images) && p.images.length > 0 
      ? p.images 
      : [p.thumbnail || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
    specs: p.specs || {
      Department: primaryCat.toUpperCase(),
      SubCategory: subCat.replace(/-/g, ' ').toUpperCase(),
      Availability: p.stock > 0 ? 'In Stock' : 'Out of Stock',
      Warranty: p.warrantyInformation || '1-Year Official Warranty',
      Shipping: p.shippingInformation || 'Free Standard 2-3 Day Delivery',
      ReturnPolicy: p.returnPolicy || '30-Day Hassle-free Returns'
    },
    reviews: Array.isArray(p.reviews) && p.reviews.length > 0 
      ? p.reviews.map((r, idx) => ({
          id: idx + 1,
          user: r.reviewerName || r.user || 'Verified Buyer',
          rating: r.rating || 5,
          comment: r.comment || 'Outstanding quality and very fast delivery.',
          date: r.date ? new Date(r.date).toISOString().split('T')[0] : '2026-03-01'
        }))
      : [
          { id: 1, user: 'Sophia Jenkins', rating: 5, comment: 'Exceeded my expectations. Great build quality!', date: '2026-03-10' },
          { id: 2, user: 'Liam Parker', rating: 4, comment: 'Very practical, works exactly as advertised.', date: '2026-02-25' }
        ]
  };
}

/**
 * Fetch all products across all categories (with grocery exclusion and full catalog limit)
 */
export async function fetchAllProducts() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    // limit=0 requests ALL products from DummyJSON (194 total)
    const res = await fetch(`${BASE_URL}?limit=0`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    const data = await res.json();

    if (data && Array.isArray(data.products) && data.products.length > 0) {
      // Exclude groceries and pet food
      const nonGroceryProducts = data.products.filter((p) => {
        const cat = (p.category || '').toLowerCase();
        const title = (p.title || '').toLowerCase();
        return (
          cat !== 'groceries' &&
          !cat.includes('grocer') &&
          !title.includes('cat food') &&
          !title.includes('dog food')
        );
      });

      const normalizedApi = nonGroceryProducts.map(normalizeProduct);

      // Prepend our curated mock flagships with safe offset IDs
      const curatedFlagships = MOCK_PRODUCTS.map((p) => ({
        ...normalizeProduct(p),
        id: 1000 + p.id,
      }));

      return [...curatedFlagships, ...normalizedApi];
    }

    return MOCK_PRODUCTS.map(normalizeProduct);
  } catch (err) {
    console.warn('DummyJSON API unavailable or timed out. Using fallback mock catalog:', err.message);
    return MOCK_PRODUCTS.map(normalizeProduct);
  }
}

/**
 * Fetch a single product by ID (with fallback)
 */
export async function fetchProductById(id) {
  const numericId = Number(id);

  // Check if it's one of our curated flagship items (1001-1030) or mock (1-30)
  if (numericId >= 1000) {
    const originalMockId = numericId - 1000;
    const foundMock = MOCK_PRODUCTS.find((p) => p.id === originalMockId);
    if (foundMock) return normalizeProduct({ ...foundMock, id: numericId });
  }

  const foundMockDirect = MOCK_PRODUCTS.find((p) => p.id === numericId);
  if (foundMockDirect) return normalizeProduct(foundMockDirect);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${BASE_URL}/${numericId}`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.category === 'groceries') {
        throw new Error('Groceries excluded from catalog');
      }
      return normalizeProduct(data);
    }
  } catch (err) {
    console.warn(`Product API failed for ID ${id}, falling back:`, err.message);
  }

  return normalizeProduct({
    id: numericId,
    title: `Premium Item #${id}`,
    description: 'High-quality curated lifestyle product with premium finish and ergonomics.',
    price: 99,
    discountPercentage: 10,
    rating: 4.6,
    stock: 12,
    category: 'fashion'
  });
}

/**
 * Fetch product categories with dedicated posters and subcategories
 */
export async function fetchCategories() {
  return MOCK_CATEGORIES;
}
