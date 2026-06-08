export interface Material {
  id: string;
  name: string;
  description: string;
  icon: string;
  characteristics: string[];
  absorbency: 'STANDARD' | 'HIGH' | 'ULTRA' | 'SPECIALIZED';
  durability: 'STANDARD' | 'HIGH' | 'ULTRA';
  friction: 'STANDARD' | 'BALANCED' | 'ENHANCED';
  sustainabilityScore: number; // 1-100
  biodegradable: boolean;
  costFactor: number;
}

export interface Formulation {
  id: string;
  name: string;
  description: string;
  stabilityTestingClass: string;
  microbiologicalScore: string;
  scentPairing: string;
  activeIngredients: string[];
  suitability: string;
}

export interface PackagingOption {
  id: string;
  name: string;
  description: string;
  sheetCountRange: string;
  lidToggle: boolean;
  imageIcon: string;
  suitability: string;
  multiplier: number;
}

export interface CustomProjectSpec {
  id?: string;
  title: string;
  materialId: string;
  gsm: number; // 35 to 85 gsm
  sheetWidth: number; // 100 to 220
  sheetHeight: number; // 100 to 220
  formulationId: string;
  packagingId: string;
  hasLid: boolean;
  orderQuantity: number; // 10,000 to 1,000,000+
  targetMarket: string;
}

export interface Proposal {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  notes: string;
  spec: CustomProjectSpec;
  submittedAt: string;
  status: 'PENDING_REVIEW' | 'FEASIBILITY_PASSED' | 'FORMULATION_APPROVED';
}
