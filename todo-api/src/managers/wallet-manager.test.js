import { WalletManager } from "./wallet-manager.js";
describe("Wallet manager", () => {
  let manager;

  beforeEach(() => {
    manager = new WalletManager();
  });

  describe("wallet.length", () => {
    it("should have two wallets now", () => {
      const wallets = new WalletManager();
      wallets.createWallet("john", 100);
      wallets.createWallet("jane", 100);
      expect(wallets.wallets.length).toBe(2);
    });
  });

  describe("test_transfer", () => {
    it("should transfer money from john to jane", () => {
      const wallets = new WalletManager();
      wallets.createWallet("john", 100);
      wallets.createWallet("jane", 100);
      const result = wallets.transfer("john", "jane", 50);

      const john = wallets.findWallet("john");
      const jane = wallets.findWallet("jane");

      expect(result).toBeDefined();
      expect(result.success).toBeTruthy();
      expect(result.source).toMatch(john.name);
      expect(result.destination).toMatch(jane.name);
      expect(result.amount).toBe(50);
      expect(john.balance).toBe(50);
      expect(jane.balance).toBe(150);

      const [johnTransaction] =
        wallets.transactions.findWalletTransactions("john");
      const [janeTransaction] =
        wallets.transactions.findWalletTransactions("jane");

      expect(johnTransaction).toBeTruthy();
      expect(johnTransaction.wallet).toMatch(john.name);
      expect(johnTransaction.amount).toBe(-50);
      expect(janeTransaction).toBeTruthy();
      expect(janeTransaction.wallet).toMatch(jane.name);
      expect(janeTransaction.amount).toBe(50);
    });
  });

  describe("test_transfer_insufficient", () => {
    it("should fail", () => {
      const wallets = new WalletManager();
      wallets.createWallet("john", 0);
      wallets.createWallet("jane", 0);
      const transaction = wallets.transfer("john", "jane", 50);

      expect(transaction.success).toBeFalsy();
      expect(transaction.error).toBe("Insufficient balance");

      const john = wallets.findWallet("john");
      const jane = wallets.findWallet("jane");

      expect(john.balance).toBe(0);
      expect(jane.balance).toBe(0);
    });
  });

  describe("test_transfer_to_nobody", () => {
    it("should fail", () => {
      const wallets = new WalletManager();
      wallets.createWallet("jane", 100);

      const transaction = wallets.transfer("jane", "john", 10);

      expect(transaction.success).toBeFalsy();
      expect(transaction.error).toBe("Invalid destination wallet");
    });
  });

  describe("test_transfer_to_nobody", () => {
    it("should fail", () => {
      const wallets = new WalletManager();
      wallets.createWallet("jane", 100);

      const transaction = wallets.transfer("john", "jane", 10);

      expect(transaction.success).toBeFalsy();
      expect(transaction.error).toBe("Invalid source wallet");
    });
  });
});
