import crypto from "crypto";
import { Transaction } from "./Transaction";

export class Block {
  private previousHash;
  private transaction;
  private timestamp;

  constructor(
    previousHash: string,
    transaction: Transaction,
    timestamp = Date.now()
  ) {
    this.previousHash = previousHash;
    this.transaction = transaction;
    this.timestamp = timestamp;
  }

  toString(): string {
    return JSON.stringify(this);
  }

  /**
   * Generate a hash of the block.
   *
   * @return string
   */
  getHash(): string {
    const hash = crypto.createHash("SHA256");
    hash.update(this.toString()).end();

    return hash.digest("hex");
  }

  getTransaction(): Transaction {
    return this.transaction;
  }
}
