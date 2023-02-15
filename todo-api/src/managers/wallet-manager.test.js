import exp from "constants";
import { createBank } from "./wallet-manager.js";
describe("Wallet manager", () => {
    let manager;

    beforeEach(() => {
        manager = new createBank();
    });

    describe("bank.accounts.length", () => {
        it("should have two bank accounts now", () =>{
            const bank = createBank();
            bank.accounts.createAccount("john", 100);
            bank.accounts.createAccount("jane", 100);
            expect(bank.accounts.accounts.length).toBe(2);
        });
    });

    describe("test_transfer", () =>{
        it("should transfer money from john to jane", () =>{
            const bank = createBank();
            bank.accounts.createAccount("john", 100);
            bank.accounts.createAccount("jane", 100);
            const result = bank.accounts.transfer("john", "jane", 50);

            const john = bank.accounts.findAccount("john");
            const jane = bank.accounts.findAccount("jane");

            expect(result).toBeDefined();
            expect(result.success).toBeTruthy();
            expect(result.source).toMatch(john.name);
            expect(result.destination).toMatch(jane.name);
            expect(result.amount).toBe(50);
            expect(john.balance).toBe(50);
            expect(jane.balance).toBe(150);

            const [johnTransaction] = bank.transactions.findAccountTransactions("john");
            const [janeTransaction] = bank.transactions.findAccountTransactions("jane");

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
            const bank = createBank();
            bank.accounts.createAccount("john", 0);
            bank.accounts.createAccount("jane", 0);
            const transaction = bank.accounts.transfer("john", "jane", 50);

            expect(transaction.success).toBeFalsy();
            expect(transaction.error).toBe("Insufficient balance");

            const john = bank.accounts.findAccount("john");
            const jane = bank.accounts.findAccount("jane");

            expect(john.balance).toBe(0);
            expect(jane.balance).toBe(0);
        });
    });

    describe("test_transfer_to_nobody", () =>{
        it("should fail", () =>{
            const bank = createBank();
            bank.accounts.createAccount("jane", 100);

            const transaction = bank.accounts.transfer("jane", "john", 10);

            expect(transaction.success).toBeFalsy();
            expect(transaction.error).toBe("Invalid destination account");
        });
    });

    describe("test_transfer_to_nobody", () =>{
        it("should fail", () =>{
            const bank = createBank();
            bank.accounts.createAccount("jane", 100);

            const transaction = bank.accounts.transfer("john", "jane", 10);

            expect(transaction.success).toBeFalsy();
            expect(transaction.error).toBe("Invalid source account");
        });
    });
});