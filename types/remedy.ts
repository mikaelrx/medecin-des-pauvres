export interface Remedy {
  id?: number;
  remede: string;
  symptomes: string[];
  description: string;
  preparation: string;
  avertissement?: string;
  categorie?: string;
  categories?: string[];
  pertinence?: number;
}
