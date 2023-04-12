import { describe, expect, test } from "vitest";
import { Wallet } from "../src/Wallet";
import { Chain } from "../src/Chain";

describe("Arthurcoin test", () => {
  test("Arthur send 1 Arthurcoin to Alma", () => {
    const Arthur = new Wallet();
    const Alma = new Wallet();

    Arthur.send(1, Alma.publicKey);

    expect(Chain.instance).toBeInstanceOf(Chain);
    expect(Chain.instance.chain).toHaveLength(2);
    expect(Chain.instance.chain).toMatchObject([
      {
        previousHash: expect.any(String),
        transaction: {
          amount: 100,
        },
      },
      {
        previousHash: expect.any(String),
        transaction: {
          amount: 1,
          senderPublicKey: Arthur.publicKey,
          receiverPublicKey: Alma.publicKey,
        },
      },
    ]);
    expect(Alma.coins()).toBe(101);
  });
});
