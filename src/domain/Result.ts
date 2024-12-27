class Result {
  private hits: number = 0;
  private misses: number = 0;

  constructor(hits: number, misses: number) {
    this.hits = hits;
    this.misses = misses;
  }

  getHits() {
    return this.hits;
  }

  getMisses() {
    return this.misses;
  }

  static getModified(result: Result, hits: number, misses: number) {
    if (hits < 0 || misses < 0)
      return new Result(result.getHits(), result.getMisses());
    return new Result(result.getHits() + hits, result.getMisses() + misses);
  }
}

export default Result;
