import { Material, Formulation, PackagingOption } from './types';

export const MATERIALS: Material[] = [
  {
    id: 'biodegradable-fiber',
    name: 'Biodegradable Fiber',
    description: 'Sustainable 100% plant-based fibers for premium baby and personal care wipes.',
    icon: 'eco',
    characteristics: ['100% Compostable', 'Zero Microplastics', 'Ultra Soft Touch'],
    absorbency: 'HIGH',
    durability: 'STANDARD',
    friction: 'STANDARD',
    sustainabilityScore: 98,
    biodegradable: true,
    costFactor: 1.25
  },
  {
    id: 'spunlace-nonwoven',
    name: 'Spunlace Non-Woven',
    description: 'High-strength industrial-grade fabric designed for medical and technical cleaning.',
    icon: 'precision_manufacturing',
    characteristics: ['Lint-Free Structure', 'High Tensile Strength', 'Solvent Compatible'],
    absorbency: 'STANDARD',
    durability: 'ULTRA',
    friction: 'BALANCED',
    sustainabilityScore: 72,
    biodegradable: false,
    costFactor: 1.00
  },
  {
    id: 'textured-pearl',
    name: 'Textured Pearl-Pattern',
    description: 'Enhanced surface area for household disinfection and deep-cleaning pet care.',
    icon: 'texture',
    characteristics: ['3D Pearl Embossing', 'Superior Dirt Capture', 'High Structural Integrity'],
    absorbency: 'HIGH',
    durability: 'HIGH',
    friction: 'ENHANCED',
    sustainabilityScore: 80,
    biodegradable: false,
    costFactor: 1.15
  },
  {
    id: 'bamboo-organic',
    name: 'Bamboo Organic Grid',
    description: 'Natural antibacterial bamboo fibers with structured grids for luxurious organic skincare.',
    icon: 'leaf',
    characteristics: ['Hypoallergenic', '90-Day Soil Degradable', 'Inherent Antimicrobial Scent'],
    absorbency: 'ULTRA',
    durability: 'HIGH',
    friction: 'BALANCED',
    sustainabilityScore: 95,
    biodegradable: true,
    costFactor: 1.35
  }
];

export const FORMULATIONS: Formulation[] = [
  {
    id: 'pure-water-99',
    name: 'Pure Biosolvent 99% Water',
    description: 'Ultrapure deionized medical-grade water with 0.1% safe preservative systems.',
    stabilityTestingClass: 'FDA Class I Approved (36M Stability)',
    microbiologicalScore: '0.00% Aerobic Colony Count',
    scentPairing: 'Fragrance-Free',
    activeIngredients: ['EDI Grade Purified Water', 'Organic Citric Acid'],
    suitability: 'Newborn Baby Wipes, Sensitive Dermatological Care'
  },
  {
    id: 'chamomile-soothing',
    name: 'Skin-Calming Herbal Serum',
    description: 'Enriched with organic chamomile, aloe extracts, and Vitamin E to soothe skin irritation.',
    stabilityTestingClass: 'Dermatest certified Premium (24M Stability)',
    microbiologicalScore: 'Passes EN1040/EN1275 standard',
    scentPairing: 'Soft Chamomile Essential Oil',
    activeIngredients: ['Chamomilla Recutita Extract', 'Aloe Vera Leaf Gel', 'Tocopherol'],
    suitability: 'Premium Makeup Removers, Soothing Intimate Clean'
  },
  {
    id: 'medical-sanitizer-75',
    name: 'Medical Grade Disinfectant',
    description: '75% Isopropyl Alcohol formulation for rapid pathogens sterilization & clinical environments.',
    stabilityTestingClass: 'Biocidal Products Regulation compliant (24M)',
    microbiologicalScore: '99.999% Germicidal Kill Rate',
    scentPairing: 'Clinical Alcohol Base',
    activeIngredients: ['75% v/v Isopropyl Alcohol', 'Hydrogen Peroxide', 'Glycerin'],
    suitability: 'Hospital Disinfection, Fast Surface Sanitizing Wipes'
  },
  {
    id: 'salicylic-exfoliation',
    name: 'Medi-Active Salicylic Complex',
    description: 'Over-the-counter clinical formula loaded with 2% Salicylic Acid for oily skin therapy.',
    stabilityTestingClass: 'Scent & Color Stable Form (18M Stability)',
    microbiologicalScore: 'Pharma-Grade Sterility Assured',
    scentPairing: 'Tee Tree Neutralizer',
    activeIngredients: ['2% Salicylic Acid', 'Melaleuca Alternifolia oil', 'Hamamelis virginiana'],
    suitability: 'Acne Cleansing Pads, Exfoliating Face Wipes'
  }
];

export const PACKAGING_OPTIONS: PackagingOption[] = [
  {
    id: 'single-sachet',
    name: 'Single Premium Sachet',
    description: 'Hermetically double-sealed single wipe aluminum foil packs for travel and catering.',
    sheetCountRange: '1 Sheet',
    lidToggle: false,
    imageIcon: 'Mail',
    suitability: 'Restaurants, Amenity Packs, Wound Disinfection Pads',
    multiplier: 0.25
  },
  {
    id: 'resealable-flowpack',
    name: 'Flexible Flow-pack',
    description: 'Industrial high-speed shrink-wrapped flexible pouch with reusable adhesive label seal.',
    sheetCountRange: '10 - 80 Sheets',
    lidToggle: true,
    imageIcon: 'PackageOpen',
    suitability: 'Everyday Household Clean, Multi-wipe Travel Pack',
    multiplier: 0.50
  },
  {
    id: 'rigid-canister',
    name: 'Rigid Air-tight Canister/Tub',
    description: 'High-density polyethylene circular tub with spring-loaded pull cap to prevent vaporization.',
    sheetCountRange: '80 - 200 Sheets',
    lidToggle: false, // rigid cap built-in
    imageIcon: 'Cone',
    suitability: 'Gym Wipe Stations, Surface Sanitizer Rolls',
    multiplier: 1.10
  }
];

export const LOGISTICS_DESTINATIONS = [
  { region: 'East Asia & ASEAN', primaryPort: 'Singapore / Tokyo', transitTimeDays: 5, dutyEstimate: 'Free/Low' },
  { region: 'North America', primaryPort: 'Los Angeles / Vancouver', transitTimeDays: 16, dutyEstimate: '6.5%' },
  { region: 'Europe (EU)', primaryPort: 'Rotterdam / Hamburg', transitTimeDays: 20, dutyEstimate: '8.2%' },
  { region: 'Middle East', primaryPort: 'Dubai (Jebel Ali)', transitTimeDays: 12, dutyEstimate: '5.0%' },
  { region: 'Latin America', primaryPort: 'Manzanillo / Santos', transitTimeDays: 24, dutyEstimate: '11.0%' }
];
