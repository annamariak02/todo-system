import { createBank } from "./wallet-manager.js";

(function test_create_account() {
  const bank = createBank();
  bank.accounts.createAccount("john", 100);
  bank.accounts.createAccount("jane", 100);

  if (bank.accounts.accounts.length !== 2) {
    throw new Error("There should be two bank accounts now");
  }

  console.log("added two accounts", bank.accounts.accounts);
})();

(function test_find_account() {
  const bank = createBank();
  bank.accounts.createAccount("john", 100);

  const account = bank.accounts.findAccount("john");

  if (account === undefined) {
    throw new Error("There should be two bank accounts now");
  }

  console.log("found john's account", account);
})();

(function test_transfer() {
  const bank = createBank();
  bank.accounts.createAccount("john", 100);
  bank.accounts.createAccount("jane", 100);
  const result = bank.accounts.transfer("john", "jane", 50);

  const john = bank.accounts.findAccount("john");
  const jane = bank.accounts.findAccount("jane");

  if (result === undefined) {
    throw new Error("The transfer should return a result result");
  }

  if (result.success !== true) {
    throw new Error("Expected result.success to be true");
  }

  if (result.source !== "john") {
    throw new Error("Expected result.source to be 'john'");
  }

  if (result.destination !== "jane") {
    throw new Error("Expected result.destination to be 'jane'");
  }

  if (result.amount !== 50) {
    throw new Error("Expected result.amount to be 50");
  }

  if (john.balance !== 50) {
    throw new Error("Expected john.balance to be 50");
  }

  if (jane.balance !== 150) {
    throw new Error("Expected jane.balance to be 150");
  }

  const [johnTransaction] = bank.transactions.findAccountTransactions("john");
  const [janeTransaction] = bank.transactions.findAccountTransactions("jane");

  if (johnTransaction === undefined) {
    throw new Error("Expected johnTransaction to be made");
  }

  if (johnTransaction.account !== "john") {
    throw new Error("Expected johnTransaction.source to be 'john'");
  }

  if (johnTransaction.amount !== -50) {
    throw new Error("Expected johnTransaction.amount to be -50");
  }

  if (janeTransaction === undefined) {
    throw new Error("Expected janeTransaction to be made");
  }

  if (janeTransaction.account !== "jane") {
    throw new Error("Expected janeTransaction.source to be 'jane'");
  }

  if (janeTransaction.amount !== 50) {
    throw new Error("Expected janeTransaction.amount to be 50");
  }
})();

// TODO: This test fails
(function test_transfer_insufficient() {
  const bank = createBank();
  bank.accounts.createAccount("john", 0);
  bank.accounts.createAccount("jane", 0);
  const transaction = bank.accounts.transfer("john", "jane", 50);

  if (transaction.success !== false) {
    throw new Error("Expected transaction.success to be false");
  }

  if (transaction.error !== "Insufficient balance") {
    throw new Error("Expected transaction.error to be 'Insufficient balance'");
  }

  const john = bank.accounts.findAccount("john");
  const jane = bank.accounts.findAccount("jane");

  if (john.balance !== 0) {
    throw new Error("Expected john.balance to be 0");
  }

  if (jane.balance !== 0) {
    throw new Error("Expected jane.balance to be 0");
  }
})();

(function test_transfer_to_nobody() {
  const bank = createBank();
  bank.accounts.createAccount("jane", 100);

  const transaction = bank.accounts.transfer("jane", "john", 10);

  if (transaction.success !== false) {
    throw new Error("Expected transaction.success to be false");
  }

  if (transaction.error !== "Invalid destination account") {
    throw new Error(
      "Expected transaction.error to be 'Invalid destination account'"
    );
  }
})();

(function test_transfer_from_nobody() {
  const bank = createBank();
  bank.accounts.createAccount("jane", 100);

  const transaction = bank.accounts.transfer("john", "jane", 10);

  if (transaction.success !== false) {
    throw new Error("Expected transaction.success to be false");
  }

  if (transaction.error !== "Invalid source account") {
    throw new Error(
      "Expected transaction.error to be 'Invalid source account'"
    );
  }
})();
