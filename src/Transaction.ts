export class Transaction {
  public readonly amount;
  private readonly senderPublicKey;
  private readonly receiverPublicKey;

  constructor(
    amount: number,
    senderPublicKey: string,
    receiverPublicKey: string
  ) {
    this.senderPublicKey = senderPublicKey;
    this.amount = amount;
    this.receiverPublicKey = receiverPublicKey;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
