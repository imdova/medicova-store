import { CategoryType, MultiCategory } from "@/types";

const medicalCategories: CategoryType[] = [
  {
    id: "1",
    title: "Medical Wear & Uniforms",
    url: "/medical-wear",
    image: "/images/medical_wear.jpg",
    isSale: true,
  },
  {
    id: "2",
    title: "Surgical Scrubs",
    url: "/surgical-scrubs",
    image: "/images/Mens_Sports_Wear.jpg",
  },
  {
    id: "3",
    title: "Lab Coats",
    url: "/lab-coats",
    image: "/images/medical-devices.jpg",
    isSale: true,
  },
  {
    id: "4",
    title: "Medical Footwear",
    url: "/medical-footwear",
    image: "/images/Watches.jpg",
  },
  {
    id: "5",
    title: "Nursing Wear",
    url: "/nursing-wear",
    image: "/images/womens_Sports_Wear.jpg",
  },
  {
    id: "6",
    title: "Medical Accessories",
    url: "/medical-accessories",
    image: "/images/medical-accessories.jpg",
  },
];

const equipmentCategories: CategoryType[] = [
  {
    id: "7",
    title: "Diagnostic Equipment",
    url: "/diagnostic-equipment",
    image:
      "https://img.freepik.com/free-photo/doctor-preparing-ophthalmologist-s-office_23-2150917654.jpg?t=st=1747838778~exp=1747842378~hmac=ce0b25b729bda14de2820c77610a08f3358e041d25dbb38346f4c22033dddf1d&w=1380",
  },
  {
    id: "8",
    title: "Surgical Instruments",
    url: "/surgical-instruments",
    image:
      "https://img.freepik.com/free-photo/top-view-various-medical-equipment_23-2149283902.jpg?t=st=1747838817~exp=1747842417~hmac=3a7bfd9043ae37eeaacdb75ada07dae2907b5ba37f38405a8b4b60954842c579&w=1380",
    isSale: true,
  },
  {
    id: "9",
    title: "Dental Equipment",
    url: "/dental-equipment",
    image:
      "https://img.freepik.com/free-photo/top-view-career-guidance-items-dentists_23-2149443482.jpg?t=st=1747838873~exp=1747842473~hmac=f3bb31490933357b63c44a9df2801dee2ffbac2284cc7dc7c17d28a8ae9da245&w=1380",
  },
  {
    id: "10",
    title: "Hospital Furniture",
    url: "/hospital-furniture",
    image:
      "https://img.freepik.com/premium-photo/hospital-room-with-bed-wood-decoration3d-rendering_258219-799.jpg?w=1380",
  },
  {
    id: "11",
    title: "Patient Care Equipment",
    url: "/patient-care-equipment",
    image:
      "https://img.freepik.com/free-photo/hospital-equipment-surgical-procedure_23-2148962526.jpg?t=st=1747839002~exp=1747842602~hmac=e5a2fdb2ee80c9c6123e5699ed807adfdc864d24abdb7b16d4b92e1457fa0e4e&w=1380",
    isSale: true,
  },
  {
    id: "12",
    title: "Medical Carts & Stands",
    url: "/medical-carts",
    image:
      "https://img.freepik.com/free-photo/high-angle-shopping-cart-with-pill-foils-copy-space_23-2148533500.jpg?t=st=1747839047~exp=1747842647~hmac=02129e7ce853c63be460c3df9be478d350936aa42cc5597c10f35f9a36e333d9&w=1380",
  },
];

const consumableCategories: CategoryType[] = [
  {
    id: "13",
    title: "Disposable Gloves",
    url: "/disposable-gloves",
    image:
      "https://img.freepik.com/free-photo/closeup-shot-person-s-hands-wearing-blue-gloves_181624-19908.jpg?t=st=1747834291~exp=1747837891~hmac=d7533ef479746bd309c17c18d3af32462e7498a86a2caeeb7a7e9b5120e1b427&w=1380",
  },
  {
    id: "14",
    title: "Face Masks & Shields",
    url: "/face-protection",
    image:
      "https://img.freepik.com/free-photo/close-up-man-with-mask_23-2148645131.jpg?t=st=1747834341~exp=1747837941~hmac=cc094b964f6582efc48d094aa973c5ce959ee2ecb1d06e52408415ff7411f39c&w=1380",
  },
  {
    id: "15",
    title: "Wound Care Supplies",
    url: "/wound-care",
    image:
      "https://img.freepik.com/free-photo/collection-medical-equipments-capsules-white-background_23-2147874827.jpg?t=st=1747834386~exp=1747837986~hmac=f0c0273e77f0b3648d1424416451fad13d0507c24b644dfb207774046dc5fe3a&w=1380",
  },
  {
    id: "16",
    title: "Infection Control",
    url: "/infection-control",
    image:
      "https://img.freepik.com/premium-photo/male-doctor-scientist-lab-coat-defensive-eyewear-mask-holds-glass-with-covid-19-word-it_146671-10515.jpg?w=1380",
  },
  {
    id: "17",
    title: "Medical Tapes & Dressings",
    url: "/medical-dressings",
    image:
      "https://img.freepik.com/free-photo/still-life-supplies_23-2149371306.jpg?t=st=1747834449~exp=1747838049~hmac=3ef7114a517ed874e3f6153f891eb9326ec07497f37c3c07a2ad1e0a6f22c467&w=1380",
  },
  {
    id: "18",
    title: "Syringes & Needles",
    url: "/syringes-needles",
    image:
      "https://img.freepik.com/free-photo/arrangement-covid19-vaccine-bottle_23-2148961582.jpg?t=st=1747834499~exp=1747838099~hmac=bce14355c2b71e3fd7d0e62befa531cd9c93935cda58c09a165c07dd82e7e426&w=1380",
  },
];

const lifestyleCategories: CategoryType[] = [
  {
    id: "19",
    title: "Sports Wear",
    url: "/sports-wear",
    image:
      "https://img.freepik.com/premium-photo/sport-clothes-shoes-headphones-white-carpet-background_392895-409533.jpg?w=1380",
  },
  {
    id: "20",
    title: "Fitness Accessories",
    url: "/fitness-accessories",
    image:
      "https://img.freepik.com/free-photo/still-life-sport-arrangement_23-2149006364.jpg?t=st=1747838366~exp=1747841966~hmac=160aa7b79a8a64f43521b7cf6c843b890381028ccd450471808312920a4efc50&w=1380",
  },
  {
    id: "21",
    title: "Luxury Watches",
    url: "/luxury-watches",
    image:
      "https://img.freepik.com/free-photo/beautiful-rendering-steel-object_23-2151897644.jpg",
  },
  {
    id: "22",
    title: "Designer Perfumes",
    url: "/designer-perfumes",
    image:
      "https://img.freepik.com/free-photo/set-plant-twigs-paper-near-textile-bottle_23-2148042173.jpg?t=st=1747838434~exp=1747842034~hmac=970c6382f89a9224e8ca783e8788f1a42df26a5adc2b6169b73617e2e2574794&w=1380",
  },
  {
    id: "23",
    title: "Professional Bags",
    url: "/professional-bags",
    image:
      "https://img.freepik.com/free-photo/woman-standing-clean-urban-space_23-2149015672.jpg?t=st=1747838474~exp=1747842074~hmac=afea36cd484908131ec85a0f8e8573c72b7876759da576ca567c7c1adf62110b&w=1380",
  },
  {
    id: "24",
    title: "Eyewear",
    url: "/eyewear",
    image:
      "https://img.freepik.com/free-photo/people-style-fashion-concept-happy-young-woman-teen-girl-casual-clothes-sunglasses_231208-5788.jpg?t=st=1747838511~exp=1747842111~hmac=5461b07eaa12035a8a1fbdec8d9b6081ee6699fe1cc106cedb5ce46ee4b971e3&w=1380",
  },
];

const allCategories: CategoryType[] = [
  ...medicalCategories,
  ...equipmentCategories,
  ...consumableCategories,
  ...lifestyleCategories,
];

const megaMenuCategories: MultiCategory[] = [
  {
    id: "1",
    title: "Medical Wear",
    url: "/medical-wear",
    image: "/images/medical-wear.jpg",
    subCategories: [
      { title: "Scrubs", url: "/medical-wear/scrubs" },
      { title: "Lab Coats", url: "/medical-wear/lab-coats" },
      { title: "Medical Shoes", url: "/medical-wear/shoes" },
      { title: "Surgical Caps", url: "/medical-wear/surgical-caps" },
    ],
    featuredProducts: [
      {
        title: "Best Selling Scrubs",
        url: "/medical-wear/scrubs/best-selling",
      },
      { title: "New Arrivals", url: "/medical-wear/new-arrivals" },
    ],
  },
];

export {
  medicalCategories,
  equipmentCategories,
  consumableCategories,
  lifestyleCategories,
  allCategories,
  megaMenuCategories,
};
