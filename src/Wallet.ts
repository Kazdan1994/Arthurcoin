import crypto from "crypto";
import { Transaction } from "./Transaction";
import { Chain } from "./Chain";

export class Wallet {
  private readonly privateKey: string;
  public readonly publicKey: string;

  constructor() {
    const keys = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });

    this.privateKey = keys.privateKey;
    this.publicKey = keys.publicKey;
  }

  /**
   * Send Arthurcoins to other wallets
   *
   * @param {number} amount
   * @param {string} receiverPublicKey
   */
  send(amount: number, receiverPublicKey: string): void {
    const transaction = new Transaction(
      amount,
      this.publicKey,
      receiverPublicKey
    );
    const shaSign = crypto.createSign("SHA256");

    shaSign.update(transaction.toString()).end();

    const signature = shaSign.sign(this.privateKey);

    Chain.instance.insertBlock(transaction, this.publicKey, signature);
  }

  /**
   * Get the coin of the wallet
   *
   * @return number
   */
  coins(): number {
    return Chain.instance.chain.reduce(
      (acc, curr) => acc + curr.getTransaction().amount,
      0
    );
  }
}
