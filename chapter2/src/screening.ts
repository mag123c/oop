import { Movie } from "./movie";

export class Screening {
  private when: Date;
  private movie: Movie;
  private sequence: number;

  constructor(when: Date, movie: Movie, sequence: number) {
    this.when = when;
    this.movie = movie;
    this.sequence = sequence;
  }

  getWhen() {
    return this.when;
  }

  getMovie() {
    return this.movie;
  }

  getSequence() {
    return this.sequence;
  }
}
