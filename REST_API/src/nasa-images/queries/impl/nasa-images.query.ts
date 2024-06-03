export class NasaImagesQuery {
  constructor(
    public readonly search: string,
    public readonly useCache: boolean,
  ) {}
}
