import prompt_sync from "prompt-sync";
import prompt_sync_history from "prompt-sync-history";
import { Wallet } from "./Wallet";

const prompt = prompt_sync({
  history: prompt_sync_history(), //open history file
});

const sender = new Wallet();
const receiver = new Wallet();

const senderName = prompt("Enter your name: ");
const receiverName = prompt("Enter receiver's name: ");
const send = prompt("Enter amount: ");

const amount = +send;

if (senderName === null) {
  console.error("sender's name is required");
}

if (receiverName === null) {
  console.error("receiver's name is required");
}

if (amount < 0) {
  console.error(`Your amount ${amount} is under 0`);
}

sender.send(amount, receiver.publicKey);

console.log(`You sent ${amount} Arthurcoins to ${receiverName} !`);

// @ts-ignore
prompt.history.save();

/*
inquirer
  .prompt([
    {
      name: "sender",
      message: "What is your name?",
    },
    {
      name: "receiver",
      message: "What is the receiver name?",
    },
    {
      name: "amount",
      message: "How much do you send?",
      type: "number",
      validate: (input: number) => input > 0,
    },
  ])
  .then((answers) => {
    console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error(error);
    }
  });
*/
