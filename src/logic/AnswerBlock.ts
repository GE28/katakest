import JPchar from "@domain/JPchar";
import { v4 as uuidv4 } from "uuid";

class AnswerBlock {
  private jpchar: JPchar;
  private id: string;

  constructor(jpchar: JPchar) {
    this.jpchar = jpchar;
    this.id = uuidv4();
  }

  getKana(): string {
    return this.jpchar.getKana();
  }

  getRomaji(): string {
    return this.jpchar.getRomaji();
  }

  getJPchar(): JPchar {
    return this.jpchar;
  }

  compare(other: AnswerBlock): boolean {
    return this.jpchar.compare(other.jpchar);
  }

  getId(): string {
    return this.id;
  }
}

export default AnswerBlock;
