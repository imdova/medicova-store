import { linksHeader } from "@/types";

export const commonLinks: linksHeader[] = [
  {
    id: "1",
    title: "Medical Wear & Accessories",
    url: "/medical-wear",
    gridLinks: [
      {
        heading: "Scrubs",
        subLinks: [
          { title: "Men's Scrubs", url: "/medical-wear/mens-scrubs" },
          { title: "Women's Scrubs", url: "/medical-wear/womens-scrubs" },
          { title: "Unisex Scrubs", url: "/medical-wear/unisex-scrubs" },
          { title: "Scrub Sets", url: "/medical-wear/scrub-sets" },
          { title: "Scrub Tops", url: "/medical-wear/scrub-tops" },
        ],
      },
      {
        heading: "Lab Coats",
        subLinks: [
          { title: "Doctor Coats", url: "/medical-wear/doctor-coats" },
          { title: "Nurse Coats", url: "/medical-wear/nurse-coats" },
          { title: "Student Coats", url: "/medical-wear/student-coats" },
          { title: "Designer Coats", url: "/medical-wear/designer-coats" },
        ],
      },
      {
        heading: "Shoes",
        subLinks: [
          { title: "Clogs", url: "/medical-wear/clogs" },
          { title: "Sneakers", url: "/medical-wear/sneakers" },
          { title: "Slip Resistant", url: "/medical-wear/slip-resistant" },
          { title: "Orthopedic", url: "/medical-wear/orthopedic" },
        ],
      },
      {
        heading: "Accessories",
        subLinks: [
          { title: "Stethoscopes", url: "/medical-wear/stethoscopes" },
          { title: "Badge Reels", url: "/medical-wear/badge-reels" },
          {
            title: "Compression Socks",
            url: "/medical-wear/compression-socks",
          },
          { title: "Medical Bags", url: "/medical-wear/medical-bags" },
        ],
      },
    ],
    banner: {
      active: true,
      title: "New Scrubs Collection",
      details: "Comfortable and stylish designs for medical professionals",
      image: "/images/medical_wear.jpg",
    },
  },
  {
    id: "2",
    title: "Sports Wear",
    url: "/sports-wear",
    gridLinks: [
      {
        heading: "Men's Sports Wear",
        subLinks: [
          { title: "Training Tops", url: "/sports-wear/mens-tops" },
          { title: "Running Shorts", url: "/sports-wear/mens-shorts" },
          { title: "Compression Wear", url: "/sports-wear/mens-compression" },
          { title: "Track Pants", url: "/sports-wear/mens-track-pants" },
        ],
      },
      {
        heading: "Women's Sports Wear",
        subLinks: [
          { title: "Sports Bras", url: "/sports-wear/womens-bras" },
          { title: "Leggings", url: "/sports-wear/womens-leggings" },
          { title: "Tank Tops", url: "/sports-wear/womens-tanks" },
          { title: "Running Skirts", url: "/sports-wear/womens-skirts" },
        ],
      },
      {
        heading: "Footwear",
        subLinks: [
          { title: "Running Shoes", url: "/sports-wear/running-shoes" },
          { title: "Training Shoes", url: "/sports-wear/training-shoes" },
          { title: "Walking Shoes", url: "/sports-wear/walking-shoes" },
          { title: "Cleats", url: "/sports-wear/cleats" },
        ],
      },
      {
        heading: "Accessories",
        subLinks: [
          { title: "Fitness Trackers", url: "/sports-wear/fitness-trackers" },
          { title: "Water Bottles", url: "/sports-wear/water-bottles" },
          { title: "Sports Bags", url: "/sports-wear/sports-bags" },
          { title: "Headbands", url: "/sports-wear/headbands" },
        ],
      },
    ],
    banner: {
      active: true,
      title: "Summer Sports Collection",
      details: "Stay cool and perform better with our new line",
      image: "/images/Mens_Sports_Wear.jpg",
    },
  },
  {
    id: "3",
    title: "Medical Devices & Equipment",
    url: "/medical-devices",
    gridLinks: [
      {
        heading: "Diagnostic Equipment",
        subLinks: [
          {
            title: "Blood Pressure Monitors",
            url: "/medical-devices/bp-monitors",
          },
          { title: "Stethoscopes", url: "/medical-devices/stethoscopes" },
          { title: "Thermometers", url: "/medical-devices/thermometers" },
          { title: "Otoscopes", url: "/medical-devices/otoscopes" },
        ],
      },
      {
        heading: "Treatment Equipment",
        subLinks: [
          { title: "Nebulizers", url: "/medical-devices/nebulizers" },
          {
            title: "Oxygen Concentrators",
            url: "/medical-devices/oxygen-concentrators",
          },
          {
            title: "Patient Monitors",
            url: "/medical-devices/patient-monitors",
          },
          { title: "Infusion Pumps", url: "/medical-devices/infusion-pumps" },
        ],
      },
      {
        heading: "Surgical Instruments",
        subLinks: [
          { title: "Scalpels", url: "/medical-devices/scalpels" },
          { title: "Forceps", url: "/medical-devices/forceps" },
          { title: "Scissors", url: "/medical-devices/scissors" },
          { title: "Retractors", url: "/medical-devices/retractors" },
        ],
      },
      {
        heading: "Dental Equipment",
        subLinks: [
          { title: "Dental Chairs", url: "/medical-devices/dental-chairs" },
          { title: "X-ray Machines", url: "/medical-devices/xray-machines" },
          { title: "Sterilizers", url: "/medical-devices/sterilizers" },
          { title: "Dental Lights", url: "/medical-devices/dental-lights" },
        ],
      },
    ],
    banner: {
      active: true,
      title: "Professional Medical Equipment",
      details: "High-quality devices for healthcare facilities",
      image: "/images/medical-devices.jpg",
    },
  },

  {
    id: "4",
    title: "Medical Furniture & Clinic Setup",
    url: "/medical-furniture",
    gridLinks: [
      {
        heading: "Examination Furniture",
        subLinks: [
          { title: "Exam Tables", url: "/medical-furniture/exam-tables" },
          {
            title: "Procedure Chairs",
            url: "/medical-furniture/procedure-chairs",
          },
          { title: "Stretchers", url: "/medical-furniture/stretchers" },
          { title: "Wheelchairs", url: "/medical-furniture/wheelchairs" },
        ],
      },
      {
        heading: "Clinic Furniture",
        subLinks: [
          {
            title: "Reception Desks",
            url: "/medical-furniture/reception-desks",
          },
          { title: "Waiting Chairs", url: "/medical-furniture/waiting-chairs" },
          {
            title: "Medical Cabinets",
            url: "/medical-furniture/medical-cabinets",
          },
          { title: "Workstations", url: "/medical-furniture/workstations" },
        ],
      },
      {
        heading: "Hospital Furniture",
        subLinks: [
          { title: "Hospital Beds", url: "/medical-furniture/hospital-beds" },
          { title: "Overbed Tables", url: "/medical-furniture/overbed-tables" },
          { title: "Patient Lifts", url: "/medical-furniture/patient-lifts" },
          { title: "Nurse Stations", url: "/medical-furniture/nurse-stations" },
        ],
      },
      {
        heading: "Storage Solutions",
        subLinks: [
          {
            title: "Medication Carts",
            url: "/medical-furniture/medication-carts",
          },
          {
            title: "Supply Cabinets",
            url: "/medical-furniture/supply-cabinets",
          },
          {
            title: "Wall-mounted Systems",
            url: "/medical-furniture/wall-systems",
          },
          {
            title: "Mobile Workstations",
            url: "/medical-furniture/mobile-workstations",
          },
        ],
      },
    ],
    banner: {
      active: true,
      title: "Complete Clinic Solutions",
      details: "Furnish your medical space with our premium products",
      image: "/images/medical-furniture.jpg",
    },
  },
  {
    id: "5",
    title: "Consumables & Disposables",
    url: "/consumables",
    gridLinks: [
      {
        heading: "Protective Equipment",
        subLinks: [
          { title: "Face Masks", url: "/consumables/face-masks" },
          { title: "Gloves", url: "/consumables/gloves" },
          { title: "Gowns", url: "/consumables/gowns" },
          { title: "Face Shields", url: "/consumables/face-shields" },
        ],
      },
      {
        heading: "Wound Care",
        subLinks: [
          { title: "Bandages", url: "/consumables/bandages" },
          { title: "Gauze", url: "/consumables/gauze" },
          { title: "Tapes", url: "/consumables/tapes" },
          { title: "Dressings", url: "/consumables/dressings" },
        ],
      },
      {
        heading: "Diagnostic Supplies",
        subLinks: [
          { title: "Test Strips", url: "/consumables/test-strips" },
          { title: "Lancets", url: "/consumables/lancets" },
          { title: "Swabs", url: "/consumables/swabs" },
          { title: "Collection Tubes", url: "/consumables/collection-tubes" },
        ],
      },
      {
        heading: "Infection Control",
        subLinks: [
          { title: "Disinfectants", url: "/consumables/disinfectants" },
          { title: "Hand Sanitizers", url: "/consumables/hand-sanitizers" },
          { title: "Surface Wipes", url: "/consumables/surface-wipes" },
          {
            title: "Sterilization Pouches",
            url: "/consumables/sterilization-pouches",
          },
        ],
      },
    ],
    banner: {
      active: true,
      title: "Essential Medical Supplies",
      details: "High-quality disposables for healthcare professionals",
      image: "/images/consumables.jpg",
    },
  },
  {
    id: "6",
    title: "Watches",
    url: "/watches",
    gridLinks: [
      {
        heading: "Men's Watches",
        subLinks: [
          { title: "Dress Watches", url: "/watches/mens-dress" },
          { title: "Sports Watches", url: "/watches/mens-sports" },
          { title: "Smart Watches", url: "/watches/mens-smart" },
          { title: "Luxury Watches", url: "/watches/mens-luxury" },
        ],
      },
      {
        heading: "Women's Watches",
        subLinks: [
          { title: "Fashion Watches", url: "/watches/womens-fashion" },
          { title: "Diamond Watches", url: "/watches/womens-diamond" },
          { title: "Smart Watches", url: "/watches/womens-smart" },
          { title: "Bangle Watches", url: "/watches/womens-bangle" },
        ],
      },
      {
        heading: "Sports Watches",
        subLinks: [
          { title: "Running Watches", url: "/watches/running" },
          { title: "Diving Watches", url: "/watches/diving" },
          { title: "GPS Watches", url: "/watches/gps" },
          { title: "Fitness Trackers", url: "/watches/fitness-trackers" },
        ],
      },
      {
        heading: "Accessories",
        subLinks: [
          { title: "Watch Straps", url: "/watches/straps" },
          { title: "Watch Winders", url: "/watches/winders" },
          { title: "Watch Cases", url: "/watches/cases" },
          { title: "Watch Tools", url: "/watches/tools" },
        ],
      },
    ],
    banner: {
      active: true,
      title: "Precision Timepieces",
      details: "Elegant watches for every occasion",
      image: "/images/Watches.jpg",
    },
  },
  {
    id: "7",
    title: "Perfumes",
    url: "/perfumes",
    gridLinks: [
      {
        heading: "Men's Fragrances",
        subLinks: [
          { title: "Eau de Parfum", url: "/perfumes/mens-parfum" },
          { title: "Eau de Toilette", url: "/perfumes/mens-toilette" },
          { title: "Colognes", url: "/perfumes/mens-cologne" },
          { title: "Gift Sets", url: "/perfumes/mens-gift-sets" },
        ],
      },
      {
        heading: "Women's Fragrances",
        subLinks: [
          { title: "Floral Scents", url: "/perfumes/womens-floral" },
          { title: "Oriental Scents", url: "/perfumes/womens-oriental" },
          { title: "Fresh Scents", url: "/perfumes/womens-fresh" },
          { title: "Luxury Collections", url: "/perfumes/womens-luxury" },
        ],
      },
      {
        heading: "Unisex Fragrances",
        subLinks: [
          { title: "Citrus Scents", url: "/perfumes/unisex-citrus" },
          { title: "Woody Scents", url: "/perfumes/unisex-woody" },
          { title: "Aromatic Scents", url: "/perfumes/unisex-aromatic" },
          { title: "Niche Perfumes", url: "/perfumes/unisex-niche" },
        ],
      },
      {
        heading: "Accessories",
        subLinks: [
          { title: "Travel Sprays", url: "/perfumes/travel-sprays" },
          { title: "Perfume Bottles", url: "/perfumes/bottles" },
          { title: "Scented Candles", url: "/perfumes/scented-candles" },
          { title: "Diffusers", url: "/perfumes/diffusers" },
        ],
      },
    ],
    banner: {
      active: true,
      title: "Luxury Fragrances",
      details: "Discover your signature scent from our collection",
      image: "/images/Perfumes.jpg",
    },
  },
  {
    id: "8",
    title: "Perfumes",
    url: "/perfumes",
    gridLinks: [
      {
        heading: "Men's Fragrances",
        subLinks: [
          { title: "Eau de Parfum", url: "/perfumes/mens-parfum" },
          { title: "Eau de Toilette", url: "/perfumes/mens-toilette" },
          { title: "Colognes", url: "/perfumes/mens-cologne" },
          { title: "Gift Sets", url: "/perfumes/mens-gift-sets" },
        ],
      },
      {
        heading: "Women's Fragrances",
        subLinks: [
          { title: "Floral Scents", url: "/perfumes/womens-floral" },
          { title: "Oriental Scents", url: "/perfumes/womens-oriental" },
          { title: "Fresh Scents", url: "/perfumes/womens-fresh" },
          { title: "Luxury Collections", url: "/perfumes/womens-luxury" },
        ],
      },
      {
        heading: "Unisex Fragrances",
        subLinks: [
          { title: "Citrus Scents", url: "/perfumes/unisex-citrus" },
          { title: "Woody Scents", url: "/perfumes/unisex-woody" },
          { title: "Aromatic Scents", url: "/perfumes/unisex-aromatic" },
          { title: "Niche Perfumes", url: "/perfumes/unisex-niche" },
        ],
      },
      {
        heading: "Accessories",
        subLinks: [
          { title: "Travel Sprays", url: "/perfumes/travel-sprays" },
          { title: "Perfume Bottles", url: "/perfumes/bottles" },
          { title: "Scented Candles", url: "/perfumes/scented-candles" },
          { title: "Diffusers", url: "/perfumes/diffusers" },
        ],
      },
    ],
    banner: {
      active: true,
      title: "Luxury Fragrances",
      details: "Discover your signature scent from our collection",
      image: "/images/Perfumes.jpg",
    },
  },
  {
    id: "9",
    title: "Perfumes",
    url: "/perfumes",
    gridLinks: [
      {
        heading: "Men's Fragrances",
        subLinks: [
          { title: "Eau de Parfum", url: "/perfumes/mens-parfum" },
          { title: "Eau de Toilette", url: "/perfumes/mens-toilette" },
          { title: "Colognes", url: "/perfumes/mens-cologne" },
          { title: "Gift Sets", url: "/perfumes/mens-gift-sets" },
        ],
      },
      {
        heading: "Women's Fragrances",
        subLinks: [
          { title: "Floral Scents", url: "/perfumes/womens-floral" },
          { title: "Oriental Scents", url: "/perfumes/womens-oriental" },
          { title: "Fresh Scents", url: "/perfumes/womens-fresh" },
          { title: "Luxury Collections", url: "/perfumes/womens-luxury" },
        ],
      },
      {
        heading: "Unisex Fragrances",
        subLinks: [
          { title: "Citrus Scents", url: "/perfumes/unisex-citrus" },
          { title: "Woody Scents", url: "/perfumes/unisex-woody" },
          { title: "Aromatic Scents", url: "/perfumes/unisex-aromatic" },
          { title: "Niche Perfumes", url: "/perfumes/unisex-niche" },
        ],
      },
      {
        heading: "Accessories",
        subLinks: [
          { title: "Travel Sprays", url: "/perfumes/travel-sprays" },
          { title: "Perfume Bottles", url: "/perfumes/bottles" },
          { title: "Scented Candles", url: "/perfumes/scented-candles" },
          { title: "Diffusers", url: "/perfumes/diffusers" },
        ],
      },
    ],
    banner: {
      active: true,
      title: "Luxury Fragrances",
      details: "Discover your signature scent from our collection",
      image: "/images/Perfumes.jpg",
    },
  },
];
