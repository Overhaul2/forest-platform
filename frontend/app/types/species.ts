export interface Species {
  id: string;

  scientificName: string;

  canonicalName: string;

  genus: {
    id: string;
    name: string;

    family: {
      id: string;
      name: string;
    };
  };

  images: {
    id: string;
    url: string;
  }[];

  vernacularNames: {
    id: string;
    name: string;
  }[];
}