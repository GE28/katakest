class JPchar {
  private romaji: string;
  private kana: string;
  // TODO: implement this property
  // static exceptionGroupRules: { [key: string]: string | undefined } = {
  //   // the initial char of romaji should define the group of the jp char, this is for the exceptions
  //   chi: "t",
  //   fu: "h",
  //   n: "w",
  // };

  constructor(kana: string, romaji: string) {
    this.romaji = romaji;
    this.kana = kana;
  }

  getRomaji() {
    return this.romaji;
  }

  getKana() {
    return this.kana;
  }

  // TODO: implement this method
  // getGroup() {
  //   let group = this.romaji[0];
  //   if (this.romaji in JPchar.exceptionGroupRules) {
  //     group = JPchar.exceptionGroupRules[this.romaji]!;
  //   }
  //   return group;
  // }

  compare(other: JPchar) {
    const sameRomaji = this.romaji === other.getRomaji();
    // TODO: make this comparison more robust
    // Can mess up when comparing ぢ and じ, or づ and ず.
    // const sameKana = this.kana === other.getKana();
    return sameRomaji;
  }
}

export default JPchar;
