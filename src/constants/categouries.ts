import { CategoryType, MultiCategory } from "@/types";

const medicalCategories: CategoryType[] = [
  {
    id: "1",
    title: "Medical Wear & Uniforms",
    slug: "medical-wear",
    image:
      "https://img.freepik.com/free-photo/group-doctors-standing-together_23-2148975431.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
    isSale: true,
  },
  {
    id: "2",
    title: "Surgical Scrubs",
    slug: "surgical-scrubs",
    image:
      "https://img.freepik.com/free-photo/doctor-wearing-blue-scrubs_23-2148975438.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "3",
    title: "Lab Coats",
    slug: "lab-coats",
    image:
      "https://img.freepik.com/free-photo/doctor-holding-stethoscope_23-2148975432.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
    isSale: true,
  },
  {
    id: "4",
    title: "Medical Footwear",
    slug: "medical-footwear",
    image:
      "https://img.freepik.com/free-photo/comfortable-shoes-medical-professionals_23-2148975440.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "5",
    title: "Nursing Wear",
    slug: "nursing-wear",
    image:
      "https://img.freepik.com/free-photo/nurse-uniform-concept_23-2148975437.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "6",
    title: "Medical Accessories",
    slug: "medical-accessories",
    image:
      "https://img.freepik.com/free-photo/stethoscope-medical-instruments_23-2148975439.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
];

const equipmentCategories: CategoryType[] = [
  {
    id: "7",
    title: "Diagnostic Equipment",
    slug: "diagnostic-equipment",
    image:
      "https://img.freepik.com/free-photo/doctor-preparing-ophthalmologist-s-office_23-2150917654.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "8",
    title: "Surgical Instruments",
    slug: "surgical-instruments",
    image:
      "https://img.freepik.com/free-photo/top-view-various-medical-equipment_23-2149283902.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
    isSale: true,
  },
  {
    id: "9",
    title: "Dental Equipment",
    slug: "dental-equipment",
    image:
      "https://img.freepik.com/free-photo/top-view-career-guidance-items-dentists_23-2149443482.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "10",
    title: "Hospital Furniture",
    slug: "hospital-furniture",
    image:
      "https://img.freepik.com/premium-photo/hospital-room-with-bed-wood-decoration3d-rendering_258219-799.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "11",
    title: "Patient Care Equipment",
    slug: "patient-care-equipment",
    image:
      "https://img.freepik.com/free-photo/hospital-equipment-surgical-procedure_23-2148962526.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
    isSale: true,
  },
  {
    id: "12",
    title: "Medical Carts & Stands",
    slug: "medical-carts",
    image:
      "https://img.freepik.com/free-photo/high-angle-shopping-cart-with-pill-foils-copy-space_23-2148533500.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
];

const consumableCategories: CategoryType[] = [
  {
    id: "13",
    title: "Disposable Gloves",
    slug: "disposable-gloves",
    image:
      "https://img.freepik.com/free-photo/closeup-shot-person-s-hands-wearing-blue-gloves_181624-19908.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "14",
    title: "Face Masks & Shields",
    slug: "face-protection",
    image:
      "https://img.freepik.com/free-photo/close-up-man-with-mask_23-2148645131.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "15",
    title: "Wound Care Supplies",
    slug: "wound-care",
    image:
      "https://img.freepik.com/free-photo/collection-medical-equipments-capsules-white-background_23-2147874827.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "16",
    title: "Infection Control",
    slug: "infection-control",
    image:
      "https://img.freepik.com/premium-photo/male-doctor-scientist-lab-coat-defensive-eyewear-mask-holds-glass-with-covid-19-word-it_146671-10515.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "17",
    title: "Medical Tapes & Dressings",
    slug: "medical-dressings",
    image:
      "https://img.freepik.com/free-photo/still-life-supplies_23-2149371306.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "18",
    title: "Syringes & Needles",
    slug: "syringes-needles",
    image:
      "https://img.freepik.com/free-photo/arrangement-covid19-vaccine-bottle_23-2148961582.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
];

const lifestyleCategories: CategoryType[] = [
  {
    id: "19",
    title: "Sports Wear",
    slug: "sports-wear",
    image:
      "https://img.freepik.com/premium-photo/sport-clothes-shoes-headphones-white-carpet-background_392895-409533.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "20",
    title: "Fitness Accessories",
    slug: "fitness-accessories",
    image:
      "https://img.freepik.com/free-photo/still-life-sport-arrangement_23-2149006364.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "21",
    title: "Luxury Watches",
    slug: "luxury-watches",
    image:
      "https://img.freepik.com/free-photo/beautiful-rendering-steel-object_23-2151897644.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "22",
    title: "Designer Perfumes",
    slug: "designer-perfumes",
    image:
      "https://img.freepik.com/free-photo/set-plant-twigs-paper-near-textile-bottle_23-2148042173.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "23",
    title: "Professional Bags",
    slug: "professional-bags",
    image:
      "https://img.freepik.com/free-photo/woman-standing-clean-urban-space_23-2149015672.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
  {
    id: "24",
    title: "Eyewear",
    slug: "eyewear",
    image:
      "https://img.freepik.com/free-photo/people-style-fashion-concept-happy-young-woman-teen-girl-casual-clothes-sunglasses_231208-5788.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
  },
];

const megaMenuCategories: MultiCategory[] = [
  {
    id: "1",
    title: "Medical Wear",
    slug: "medical-wear",
    image:
      "https://img.freepik.com/free-photo/group-doctors-standing-together_23-2148975431.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
    subCategories: [
      {
        id: "1-1",
        title: "Scrubs",
        slug: "scrubs",
        image:
          "https://img.freepik.com/free-photo/doctor-wearing-blue-scrubs_23-2148975438.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },
        subCategories: [
          {
            id: "1-1-1",
            title: "Unisex Scrubs",
            slug: "scrubs-unisex",
            image:
              "https://img.freepik.com/free-photo/doctor-wearing-blue-scrubs_23-2148975438.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "1-1-2",
            title: "Women's Scrubs",
            slug: "scrubs-womens",
            image:
              "https:-/img.freepik.com/free-photo/female-doctor-wearing-scrubs_23-2148975436.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "1-1-3",
            title: "Men's Scrubs",
            slug: "scrubs-mens",
            image:
              "https://img.freepik.com/free-photo/male-doctor-wearing-scrubs_23-2148975435.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
      {
        id: "1-2",
        title: "Lab Coats",
        slug: "lab-coats",
        image:
          "https://img.freepik.com/free-photo/doctor-holding-stethoscope_23-2148975432.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },
        subCategories: [
          {
            id: "1-2-1",
            title: "Short Lab Coats",
            slug: "lab-coats-short",
            image:
              "https://img.freepik.com/free-photo/doctor-holding-stethoscope_23-2148975432.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "1-2-2",
            title: "Long Lab Coats",
            slug: "lab-coats-long",
            image:
              "https://img.freepik.com/free-photo/doctor-wearing-white-coat_23-2148975433.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "1-2-3",
            title: "Designer Lab Coats",
            slug: "lab-coats-designer",
            image:
              "https://img.freepik.com/free-photo/fashionable-doctor_23-2148975434.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
      {
        id: "1-3",
        title: "Medical Shoes",
        slug: "shoes",
        image:
          "https://img.freepik.com/free-photo/comfortable-shoes-medical-professionals_23-2148975440.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },
        subCategories: [
          {
            id: "1-3-1",
            title: "Clogs",
            slug: "shoes-clogs",
            image:
              "https://img.freepik.com/free-photo/comfortable-shoes-medical-professionals_23-2148975440.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "1-3-2",
            title: "Sneakers",
            slug: "shoes-sneakers",
            image:
              "https://img.freepik.com/free-photo/sport-shoes-white-background_23-2148975441.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "1-3-3",
            title: "Slip-resistant",
            slug: "shoes-slip-resistant",
            image:
              "https://img.freepik.com/free-photo/shoes-with-non-slip-sole_23-2148975442.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
      {
        id: "1-4",
        title: "Surgical Caps",
        slug: "surgical-caps",
        image:
          "https://img.freepik.com/free-photo/surgical-cap-isolated-white-background_23-2148975443.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },
        subCategories: [
          {
            id: "1-4-1",
            title: "Disposable Caps",
            slug: "disposable",
            image:
              "https://img.freepik.com/free-photo/surgical-cap-isolated-white-background_23-2148975443.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "1-4-2",
            title: "Reusable Caps",
            slug: "surgical-caps-reusable",
            image:
              "https://img.freepik.com/free-photo/reusable-surgical-cap_23-2148975444.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "1-4-3",
            title: "Designer Caps",
            slug: "surgical-caps-designer",
            image:
              "https://img.freepik.com/free-photo/colorful-surgical-caps_23-2148975445.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Medical Equipment",
    slug: "medical-equipment",
    image:
      "https://img.freepik.com/free-photo/top-view-various-medical-equipment_23-2149283902.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
    subCategories: [
      {
        id: "2-1",
        title: "Diagnostic Equipment",
        slug: "diagnostic",
        image:
          "https://img.freepik.com/free-photo/doctor-preparing-ophthalmologist-s-office_23-2150917654.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },
        subCategories: [
          {
            id: "2-1-1",
            title: "Stethoscopes",
            slug: "stethoscopes",
            image:
              "https://img.freepik.com/free-photo/stethoscope-medical-instruments_23-2148975439.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "2-1-2",
            title: "Blood Pressure Monitors",
            slug: "/medical-equipment/diagnostic/blood-pressure",
            image:
              "https://img.freepik.com/free-photo/blood-pressure-monitor_23-2148975446.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "2-1-3",
            title: "Thermometers",
            slug: "/medical-equipment/diagnostic/thermometers",
            image:
              "https://img.freepik.com/free-photo/digital-thermometer_23-2148975447.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
      {
        id: "2-2",
        title: "Surgical Instruments",
        slug: "surgical",
        image:
          "https://img.freepik.com/free-photo/top-view-various-medical-equipment_23-2149283902.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },
        subCategories: [
          {
            id: "2-2-1",
            title: "Scalpels",
            slug: "/medical-equipment/surgical/scalpels",
            image:
              "https://img.freepik.com/free-photo/surgical-scalpel_23-2148975448.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "2-2-2",
            title: "Forceps",
            slug: "/medical-equipment/surgical/forceps",
            image:
              "https://img.freepik.com/free-photo/surgical-forceps_23-2148975449.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "2-2-3",
            title: "Scissors",
            slug: "/medical-equipment/surgical/scissors",
            image:
              "https://img.freepik.com/free-photo/surgical-scissors_23-2148975450.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
      {
        id: "2-3",
        title: "Dental Equipment",
        slug: "equipment-dental",
        image:
          "https://img.freepik.com/free-photo/top-view-career-guidance-items-dentists_23-2149443482.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },
        subCategories: [
          {
            id: "2-3-1",
            title: "Dental Chairs",
            slug: "dental-chairs",
            image:
              "https://img.freepik.com/free-photo/dental-chair_23-2148975451.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "2-3-2",
            title: "Dental Drills",
            slug: "dental-drills",
            image:
              "https://img.freepik.com/free-photo/dental-drill_23-2148975452.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "2-3-3",
            title: "X-ray Machines",
            slug: "dental-xray",
            image:
              "https://img.freepik.com/free-photo/dental-xray-machine_23-2148975453.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
      {
        id: "2-4",
        title: "Patient Monitoring",
        slug: "monitoring",
        image:
          "https://img.freepik.com/free-photo/hospital-equipment-surgical-procedure_23-2148962526.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },

        subCategories: [
          {
            id: "2-4-1",
            title: "ECG Machines",
            slug: "/medical-equipment/monitoring/ecg",
            image:
              "https://img.freepik.com/free-photo/ecg-machine_23-2148975454.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "2-4-2",
            title: "Pulse Oximeters",
            slug: "/medical-equipment/monitoring/oximeters",
            image:
              "https://img.freepik.com/free-photo/pulse-oximeter_23-2148975455.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "2-4-3",
            title: "Ventilators",
            slug: "/medical-equipment/monitoring/ventilators",
            image:
              "https://img.freepik.com/free-photo/medical-ventilator_23-2148975456.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Medical Consumables",
    slug: "medical-consumables",
    image:
      "https://img.freepik.com/free-photo/collection-medical-equipments-capsules-white-background_23-2147874827.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },

    subCategories: [
      {
        id: "3-1",
        title: "Disposable Products",
        slug: "disposable",
        image:
          "https://img.freepik.com/free-photo/closeup-shot-person-s-hands-wearing-blue-gloves_181624-19908.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },

        subCategories: [
          {
            id: "3-1-1",
            title: "Gloves",
            slug: "/medical-consumables/disposable/gloves",
            image:
              "https://img.freepik.com/free-photo/closeup-shot-person-s-hands-wearing-blue-gloves_181624-19908.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "3-1-2",
            title: "Masks",
            slug: "/medical-consumables/disposable/masks",
            image:
              "https://img.freepik.com/free-photo/close-up-man-with-mask_23-2148645131.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "3-1-3",
            title: "Syringes",
            slug: "/medical-consumables/disposable/syringes",
            image:
              "https://img.freepik.com/free-photo/arrangement-covid19-vaccine-bottle_23-2148961582.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
      {
        id: "3-2",
        title: "Wound Care",
        slug: "wound-care",
        image:
          "https://img.freepik.com/free-photo/still-life-supplies_23-2149371306.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },

        subCategories: [
          {
            id: "3-2-1",
            title: "Bandages",
            slug: "/medical-consumables/wound-care/bandages",
            image:
              "https://img.freepik.com/free-photo/bandages-white-background_23-2148975457.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "3-2-2",
            title: "Gauze",
            slug: "/medical-consumables/wound-care/gauze",
            image:
              "https://img.freepik.com/free-photo/medical-gauze_23-2148975458.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "3-2-3",
            title: "Antiseptics",
            slug: "/medical-consumables/wound-care/antiseptics",
            image:
              "https://img.freepik.com/free-photo/antiseptic-solution_23-2148975459.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
      {
        id: "3-3",
        title: "Infection Control",
        slug: "infection-control",
        image:
          "https://img.freepik.com/premium-photo/male-doctor-scientist-lab-coat-defensive-eyewear-mask-holds-glass-with-covid-19-word-it_146671-10515.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },

        subCategories: [
          {
            id: "3-3-1",
            title: "Sanitizers",
            slug: "/medical-consumables/infection-control/sanitizers",
            image:
              "https://img.freepik.com/free-photo/hand-sanitizer_23-2148975460.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "3-3-2",
            title: "Disinfectants",
            slug: "/medical-consumables/infection-control/disinfectants",
            image:
              "https://img.freepik.com/free-photo/disinfectant-spray_23-2148975461.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "3-3-3",
            title: "Protective Gear",
            slug: "/medical-consumables/infection-control/protective-gear",
            image:
              "https://img.freepik.com/free-photo/protective-medical-gear_23-2148975462.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
      {
        id: "3-4",
        title: "Medical Tapes",
        slug: "medical-consumables-tapes",
        image:
          "https://img.freepik.com/free-photo/medical-tape_23-2148975463.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },
        subCategories: [
          {
            id: "3-4-1",
            title: "Adhesive Tapes",
            slug: "/medical-consumables/tapes/adhesive",
            image:
              "https://img.freepik.com/free-photo/medical-tape_23-2148975463.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "3-4-2",
            title: "Surgical Tapes",
            slug: "/medical-consumables/tapes/surgical",
            image:
              "https://img.freepik.com/free-photo/surgical-tape_23-2148975464.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "3-4-3",
            title: "Specialty Tapes",
            slug: "/medical-consumables/tapes/specialty",
            image:
              "https://img.freepik.com/free-photo/specialty-medical-tape_23-2148975465.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Lifestyle Products",
    slug: "lifestyle",
    image:
      "https://img.freepik.com/premium-photo/sport-clothes-shoes-headphones-white-carpet-background_392895-409533.jpg?w=1380",
    cover:
      "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
    banner: {
      image:
        "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
      url: "#",
    },
    subCategories: [
      {
        id: "4-1",
        title: "Fashion",
        slug: "fashion",
        image:
          "https://img.freepik.com/free-photo/woman-standing-clean-urban-space_23-2149015672.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },
        subCategories: [
          {
            id: "4-1-1",
            title: "Casual Wear",
            slug: "/casual",
            image:
              "https://img.freepik.com/free-photo/people-style-fashion-concept-happy-young-woman-teen-girl-casual-clothes-sunglasses_231208-5788.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "4-1-2",
            title: "Formal Wear",
            slug: "formal",
            image:
              "https://img.freepik.com/free-photo/portrait-handsome-businessman-suit_23-2148975466.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "4-1-3",
            title: "Athleisure",
            slug: "fashion/athleisure",
            image:
              "https://img.freepik.com/free-photo/sporty-woman-posing_23-2148975467.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
      {
        id: "4-2",
        title: "Accessories",
        slug: "accessories",
        image:
          "https://img.freepik.com/free-photo/beautiful-rendering-steel-object_23-2151897644.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },
        subCategories: [
          {
            id: "4-2-1",
            title: "Watches",
            slug: "watches",
            image:
              "https://img.freepik.com/free-photo/beautiful-rendering-steel-object_23-2151897644.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "4-2-2",
            title: "Jewelry",
            slug: "jewelry",
            image:
              "https://img.freepik.com/free-photo/elegant-jewelry-display_23-2148975468.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "4-2-3",
            title: "Eyewear",
            slug: "eyewear",
            image:
              "https://img.freepik.com/free-photo/people-style-fashion-concept-happy-young-woman-teen-girl-casual-clothes-sunglasses_231208-5788.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
      {
        id: "4-3",
        title: "Wellness",
        slug: "wellness",
        image:
          "https://img.freepik.com/free-photo/still-life-sport-arrangement_23-2149006364.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },
        subCategories: [
          {
            id: "4-3-1",
            title: "Fitness Equipment",
            slug: "wellness/fitness",
            image:
              "https://img.freepik.com/free-photo/still-life-sport-arrangement_23-2149006364.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "4-3-2",
            title: "Massage Tools",
            slug: "massage",
            image:
              "https://img.freepik.com/free-photo/massage-tools_23-2148975469.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "4-3-3",
            title: "Relaxation",
            slug: "relaxation",
            image:
              "https://img.freepik.com/free-photo/relaxation-products_23-2148975470.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
      {
        id: "4-4",
        title: "Personal Care",
        slug: "personal-care",
        image:
          "https://img.freepik.com/free-photo/set-plant-twigs-paper-near-textile-bottle_23-2148042173.jpg?w=1380",
        cover:
          "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
        banner: {
          image:
            "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
          url: "#",
        },
        subCategories: [
          {
            id: "4-4-1",
            title: "Fragrances",
            slug: "fragrances",
            image:
              "https://img.freepik.com/free-photo/set-plant-twigs-paper-near-textile-bottle_23-2148042173.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "4-4-2",
            title: "Skincare",
            slug: "skincare",
            image:
              "https://img.freepik.com/free-photo/skincare-products_23-2148975471.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
          {
            id: "4-4-3",
            title: "Haircare",
            slug: "haircare",
            image:
              "https://img.freepik.com/free-photo/hair-care-products_23-2148975472.jpg?w=1380",
            cover:
              "https://f.nooncdn.com/mpcms/EN0003/assets/59200512-d12c-4e77-a765-30c623bcf11a.gif",
            banner: {
              image:
                "https://f.nooncdn.com/mpcms/EN0003/assets/10acc974-456a-4f1c-b0b3-35b894a42b50.png",
              url: "#",
            },
          },
        ],
      },
    ],
  },
];
const allCategories: CategoryType[] = [
  ...medicalCategories,
  ...equipmentCategories,
  ...consumableCategories,
  ...lifestyleCategories,
  ...megaMenuCategories,
];

export {
  medicalCategories,
  equipmentCategories,
  consumableCategories,
  lifestyleCategories,
  allCategories,
  megaMenuCategories,
};
