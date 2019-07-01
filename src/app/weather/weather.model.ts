export class WeatherModel {
  constructor(
    public temp: number,
    public summary: string,
    public wind: number,
    public humidity: number,
    public icon: string
  ) {}
}
