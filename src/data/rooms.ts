import React from "react";
import { Wifi, Tv, Coffee, Wind, Bath, Gamepad2, MonitorSmartphone } from "lucide-react";

export const AMENITY_ICONS: Record<string, React.ElementType> = {
  "Wi-Fi": Wifi,
  "AC": Wind,
  "TV": Tv,
  "Coffee Maker": Coffee,
  "Espresso Machine": Coffee,
  "Mini Bar": MonitorSmartphone, // Proxy for mini-bar icon
  "Lounge Access": Coffee,
  "Bathtub": Bath,
  "Gaming Console": Gamepad2,
};

export const ROOMS_DATA = [
  {
    id: '1',
    name: "Classic Deluxe Room",
    category: "Deluxe",
    price: 120,
    size: 32,
    popularity: 4,
    images: [
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?q=80&w=1400",
      "https://images.unsplash.com/photo-1618773928120-2c7096e2329e?q=80&w=1400",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1400"
    ],
    description: "A serene escape featuring elegant furnishings, a king-size bed, and a modern marble bathroom with a walk-in rain shower.",
    amenities: ["Wi-Fi", "AC", "TV", "Coffee Maker", "Mini Bar"],
    bedType: "1 King Bed",
    view: "City View",
    occupancy: 2
  },
  {
    id: '2',
    name: "Executive Corner Suite",
    category: "Executive",
    price: 250,
    size: 55,
    popularity: 5,
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1400",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400",
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1400"
    ],
    description: "Expansive corner suite offering panoramic views, a separate living area, and exclusive access to the Executive Lounge.",
    amenities: ["Wi-Fi", "AC", "TV", "Coffee Maker", "Mini Bar", "Lounge Access", "Bathtub"],
    bedType: "1 King Bed",
    view: "Panoramic Skyline",
    occupancy: 2
  },
  {
    id: '3',
    name: "Family Connecting Suites",
    category: "Family Suites",
    price: 320,
    size: 75,
    popularity: 3,
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1400",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1400"
    ],
    description: "Perfect for families, featuring two interconnecting rooms, twin beds for children, and spacious shared living area.",
    amenities: ["Wi-Fi", "AC", "TV", "Coffee Maker", "Mini Bar", "Gaming Console"],
    bedType: "1 King, 2 Twin Beds",
    view: "Courtyard View",
    occupancy: 4
  },
  {
    id: '4',
    name: "Premium Executive Room",
    category: "Executive",
    price: 210,
    size: 45,
    popularity: 4,
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1400",
      "https://images.unsplash.com/photo-1598928506311-c55dd7d825c3?q=80&w=1400"
    ],
    description: "Heightened luxury on our upper floors with bespoke amenities, premium bedding, and a dedicated workspace.",
    amenities: ["Wi-Fi", "AC", "TV", "Espresso Machine", "Lounge Access"],
    bedType: "1 King Bed",
    view: "High-floor City View",
    occupancy: 2
  }
];

export type Room = typeof ROOMS_DATA[0];
