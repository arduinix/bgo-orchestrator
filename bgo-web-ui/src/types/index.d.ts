export interface Contact {
  name: string;
  subject: string;
  email: string;
  message: string;
}

export interface Ecosystem {
  id: string;
  name: string;
  description: string;
  totalAcres: number;
  landOwner: string;
  outerEntity: string;
  county: string;
  state: string;
  country: string;
  latitudeCenter: number;
  longitudeCenter: number;
  elevation: number;
  createdDate: string;
  fTotalImages: number;
  fIdentifiedSpecies: number;
}

export interface event {
  id: string;
  name: string;
  location: string;
  createdDate: string;
  isPlayed: boolean;
  imagePath?: string | null;
}
