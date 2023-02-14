import { createBank } from "./wallet-manager.js";
describe("Wallet manager", () => {
    let manager;

    beforeEach(() => {
        manager = new createBank;
    });

    describe("bank.accounts.length", () => {
        it("should have two bank accounts now", () =>{
            const bank = createBank();
            bank.accounts.createAccount("john", 100);
            bank.accounts.createAccount("jane", 100);
            expect(bank.accounts.accounts.length).toBe(2);
        });
    });

    // describe("bank.account.findAccount", () => {
    //     it("should find john's account", () => {
    //     const bank = createBank();
    //     const account = bank.accounts.createAccount("john", 100);
    //     const result = bank.accounts.findAccount("john");
    //     expect(result).toBeDefined();
    //     expect(result).toMatchObject(account);
    //     });
    // });

    // describe("transfer", () =>{
    //     it("it should transfer money from john to jane", () => {
    //         const bank = createBank();
    //         bank.accounts.createAccount("john", 100);
    //         bank.accounts.createAccount("jane", 100);
    //         const result = bank.accounts.transfer({
    //             source: "john",
    //             destination: "jane", 
    //             amount: 50,
    //         });
    //     });
    // });
});