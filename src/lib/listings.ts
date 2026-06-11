export type Listing = {
  id: string;
  name: string;
  crop: "Groundnuts" | "Maize";
  seller: string;
  district: string;
  price: number;
  image: string;
  availability: "Available Now" | "Harvesting Soon" | "Pre-Order";
  deliveryDate: string; // ISO date
};

export const LISTINGS: Listing[] = [
  {
    id: "1",
    name: "Premium Chalimbana Groundnuts",
    crop: "Groundnuts",
    seller: "Mphatso Banda",
    district: "Lilongwe",
    price: 850,
    image: "https://images.unsplash.com/photo-1567892737950-30c4db37cd89?w=600",
    availability: "Available Now",
    deliveryDate: "2026-06-15",
  },
  {
    id: "2",
    name: "Hybrid Maize SC403",
    crop: "Maize",
    seller: "Chimwemwe Phiri",
    district: "Kasungu",
    price: 320,
    image: "https://images.unsplash.com/photo-1601593768793-fda4ee48ad07?w=600",
    availability: "Harvesting Soon",
    deliveryDate: "2026-06-25",
  },
  {
    id: "3",
    name: "Organic Groundnuts",
    crop: "Groundnuts",
    seller: "Tadala Mwale",
    district: "Mchinji",
    price: 920,
    image: "https://images.unsplash.com/photo-1604154691257-9426761c1382?w=600",
    availability: "Available Now",
    deliveryDate: "2026-06-12",
  },
  {
    id: "4",
    name: "Open-Pollinated Maize",
    crop: "Maize",
    seller: "Yamikani Nkhoma",
    district: "Ntchisi",
    price: 270,
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600",
    availability: "Pre-Order",
    deliveryDate: "2026-07-05",
  },
  {
    id: "5",
    name: "Roasted Groundnuts",
    crop: "Groundnuts",
    seller: "Esnart Zulu",
    district: "Lilongwe",
    price: 1200,
    image: "https://images.unsplash.com/photo-1567529692333-de9fd6772897?w=600",
    availability: "Available Now",
    deliveryDate: "2026-06-10",
  },
  {
    id: "6",
    name: "White Maize Grade A",
    crop: "Maize",
    seller: "Patrick Gondwe",
    district: "Dowa",
    price: 350,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600",
    availability: "Harvesting Soon",
    deliveryDate: "2026-06-20",
  },
];

export const DISTRICTS = [
  "Lilongwe", "Kasungu", "Mchinji", "Ntchisi", "Dowa", "Salima",
  "Mzuzu", "Blantyre", "Zomba", "Mangochi",
];
