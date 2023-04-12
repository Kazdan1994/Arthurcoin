import { Block } from "./Block";
import { Transaction } from "./Transaction";
import crypto from "crypto";

export class Chain {
  static instance = new Chain();
  public chain: Block[];

  constructor() {
    this.chain = [new Block("", new Transaction(100, "temp", "temp"))];
  }

  /**
   * Get the last hash of the chain
   *
   * @return string
   */
  getPreviousBlockHash(): string {
    return this.chain[this.chain.length - 1].getHash();
  }

  /**
   * Create and insert a block into our chain.
   *
   * @param {Transaction} transaction
   * @param {string} senderPublicKey
   * @param {Buffer} signature
   */
  insertBlock(
    transaction: Transaction,
    senderPublicKey: string,
    signature: Buffer
  ): void {
    const verify = crypto.createVerify("SHA256");

    verify.update(transaction.toString());

    const isValid = verify.verify(senderPublicKey, signature);

    if (isValid) {
      const block = new Block(this.getPreviousBlockHash(), transaction);

      this.chain.push(block);
    }
  }
}
