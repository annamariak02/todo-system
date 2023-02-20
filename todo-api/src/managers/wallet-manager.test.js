import exp from "constants";
import { WalletManager } from "./wallet-manager.js";
describe("Wallet manager", () => {
    let manager;

    beforeEach(() => {
        manager = new WalletManager();
    });

    describe("wallet.accounts.length", () => {
        it("should have two wallet accounts now", () =>{
            const wallet = new WalletManager();
            wallet.accounts.createAccount("john", 100);
            wallet.accounts.createAccount("jane", 100);
            expect(wallet.accounts.accounts.length).toBe(2);
        });
    });

    describe("test_transfer", () =>{
        it("should transfer money from john to jane", () =>{
            const wallet = new WalletManager();
            wallet.accounts.createAccount("john", 100);
            wallet.accounts.createAccount("jane", 100);
            const result = wallet.accounts.transfer("john", "jane", 50);

            const john = wallet.accounts.findAccount("john");
            const jane = wallet.accounts.findAccount("jane");

            expect(result).toBeDefined();
            expect(result.success).toBeTruthy();
            expect(result.source).toMatch(john.name);
            expect(result.destination).toMatch(jane.name);
            expect(result.amount).toBe(50);
            expect(john.balance).toBe(50);
            expect(jane.balance).toBe(150);

            const [johnTransaction] = wallet.transactions.findAccountTransactions("john");
            const [janeTransaction] = wallet.transactions.findAccountTransactions("jane");

            expect(johnTransaction).toBeTruthy();
            expect(johnTransaction.account).toMatch(john.name);
            expect(johnTransaction.amount).toBe(-50);
            expect(janeTransaction).toBeTruthy();
            expect(janeTransaction.account).toMatch(jane.name);
            expect(janeTransaction.amount).toBe(50);
        });
    });

    describe("test_transfer_insufficient", () =>{
        it("should fail", () =>{
            const wallet = new WalletManager();
            wallet.accounts.createAccount("john", 0);
            wallet.accounts.createAccount("jane", 0);
            const transaction = wallet.accounts.transfer("john", "jane", 50);

            expect(transaction.success).toBeFalsy();
            expect(transaction.error).toBe("Insufficient balance");

            const john = wallet.accounts.findAccount("john");
            const jane = wallet.accounts.findAccount("jane");

            expect(john.balance).toBe(0);
            expect(jane.balance).toBe(0);
        });
    });

    describe("test_transfer_to_nobody", () =>{
        it("should fail", () =>{
            const wallet = new WalletManager();
            wallet.accounts.createAccount("jane", 100);

            const transaction = wallet.accounts.transfer("jane", "john", 10);

            expect(transaction.success).toBeFalsy();
            expect(transaction.error).toBe("Invalid destination account");
        });
    });

    describe("test_transfer_to_nobody", () =>{
        it("should fail", () =>{
            const wallet = new WalletManager();
            wallet.accounts.createAccount("jane", 100);

            const transaction = wallet.accounts.transfer("john", "jane", 10);

            expect(transaction.success).toBeFalsy();
            expect(transaction.error).toBe("Invalid source account");
        });
    });
});