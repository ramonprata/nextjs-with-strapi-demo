export interface IMovie {
  id: string;
  attributes: {
    name: string;
    synopsis: string;
    imagePath: string;
  };
}
