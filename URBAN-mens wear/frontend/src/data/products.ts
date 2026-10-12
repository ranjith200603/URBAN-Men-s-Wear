export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Relaxed Oxford Shirt",
    category: "Shirts",
    price: 1499,
    oldPrice: 1999,
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: 2,
    name: "Essential Black Tee",
    category: "T-Shirts",
    price: 899,
    oldPrice: 1199,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: 3,
    name: "Straight Fit Denim",
    category: "Jeans",
    price: 1899,
    oldPrice: 2499,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: 4,
    name: "Classic Overshirt",
    category: "Jackets",
    price: 2299,
    oldPrice: 2999,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: 5,
    name: "Premium Cotton Inner",
    category: "Inners",
    price: 599,
    oldPrice: 799,
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: 6,
    name: "Classic White Sneakers",
    category: "Shoes & Accessories",
    price: 2499,
    oldPrice: 3299,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: 7,
    name: "Leather Crossbody Bag",
    category: "Shoes & Accessories",
    price: 1799,
    oldPrice: 2299,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: 8,
    name: "Relaxed Beige Shirt",
    category: "Shirts",
    price: 1599,
    oldPrice: 2099,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
  },
];