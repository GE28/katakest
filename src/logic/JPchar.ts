class JPchar {
  private romaji: string;
  private kana: string;
  static exceptionGroupRules: { [key: string]: string | undefined } = {
    // the initial char of romaji should define the group of the jp char, this is for the exceptions
    chi: "t",
    fu: "h",
    n: "w",
  };

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

  getGroup() {
    let group = this.romaji[0];
    if (this.romaji in JPchar.exceptionGroupRules) {
      group = JPchar.exceptionGroupRules[this.romaji]!;
    }
    return group;
  }

  compare(other: JPchar) {
    const sameRomaji = this.romaji === other.getRomaji();
    const sameKana = this.kana === other.getKana();
    return sameRomaji && sameKana;
  }
}

export default JPchar;
