import { AccountManager, Account } from "./account-manager.js";

describe("Account Manager", () => {
  /** @type {AccountManager} */
  let manager;

  beforeEach(() => {
    manager = new AccountManager();
  });

  describe("AccountManager.listAccounts", () => {
    it("should return no accounts", () => {
      const accounts = manager.listAccounts();
      expect(accounts).toMatchObject([]);
    });

    it("should return one account", () => {
      const account = new Account({
        id: 0,
        username: "john.doe",
        password: "password",
      });
      manager.accounts = [account];

      const accounts = manager.listAccounts();
      expect(accounts.length).toBe(1);
      expect(accounts[0]).toBeInstanceOf(Account);
      expect(accounts[0]).toHaveProperty("id");
      expect(accounts[0]).toHaveProperty("username", "john.doe");
      expect(accounts[0]).toHaveProperty("password", "password");
    });
  });

  describe("AccountManager.findAccountByUsername", () => {
    it("should return the user", () => {
      const account = new Account({
        id: 0,
        username: "john.doe",
        password: "password",
      });
      manager.accounts = [account];

      const result = manager.findAccountByUsername(account.username);
      expect(result).toBeDefined();
      expect(result).toMatchObject(account);
    });

    it("should return undefined if the email doesn't match any users", () => {
      manager.accounts = [
        new Account({
          id: 0,
          username: "john.doe",
          password: "password",
        }),
      ];

      const result = manager.findAccountByUsername("jane.doe");
      expect(result).toBeUndefined();
    });
  });

  describe("AccountManager.createAccount", () => {
    it("should return the account object", () => {
      const account = manager.createAccount({
        username: "john.doe",
        password: "password",
      });

      expect(account).toBeInstanceOf(Account);
      expect(account).toHaveProperty("id");
      expect(account).toHaveProperty("username");
      expect(account).toHaveProperty("password");
    });

    it("should add the account into the accounts array", () => {
      const account = manager.createAccount({
        username: "john.doe",
        password: "password",
      });
      expect(manager.accounts.length).toBe(1);
      expect(manager.accounts[0]).toMatchObject(account);
    });

    it("should not store the password as plain-text", () => {
      const password = "password";
      const account = manager.createAccount({
        username: "john.doe",
        password,
      });

      expect(account).toBeInstanceOf(Account);
      expect(account.password).not.toBe(password);

      expect(manager.accounts.length).toBe(1);
      expect(manager.accounts[0].password).not.toBe(password);
    });

    it("should throw an error if the username is already taken", () => {
      manager.createAccount({
        username: "john.doe",
        password: "password",
      });

      expect(() => {
        manager.createAccount({
          username: "john.doe",
          password: "password",
        });
      }).toThrow(/username already taken/i);
    });
  });

  describe("Account", () => {
    it("should create a new account with a pre-defined ID", () => {
      const account = manager.createAccount({
        id: "predefined-id",
        username: "john.doe",
        password: "password",
      });

      expect(account.id).toBe("predefined-id");
    });

    it("should create a new account with a unique ID", () => {
      const account = manager.createAccount({
        username: "john.doe",
        password: "password",
      });

      expect(account.id).toBeDefined();
      expect(typeof account.id).toBe("string");
      expect(account.id.length).toBeGreaterThan(0);
    });

    describe("Account.verifyPassword", () => {
      it("should return true if the password matches", () => {
        const password = "password";
        const account = manager.createAccount({
          username: "john.doe",
          password,
        });

        expect(account.verifyPassword(password)).toEqual(true);
      });

      it("should return false if the password does not match", () => {
        const account = manager.createAccount({
          username: "john.doe",
          password: "password",
        });

        expect(account.verifyPassword("wrong password")).toEqual(false);
      });
    });

    describe("Account.deleteAccount", () => {
      it("should delete account if account exists", () => {
        const account = manager.createAccount({
          id: "50",
          username: "john.doe",
          password: "password",
        });
        const deleteAcc = manager.deleteAccount("50");

        expect(deleteAcc).toBeTruthy();
      });

      it("should not delete account that doesn't exist", () => {
        const account1 = manager.createAccount({
          id: "50",
          username: "john.doe",
          password: "password",
        });
        const account2 = manager.createAccount({
          id: "100",
          username: "jane.doe",
          password: "password",
        });
        const account3 = manager.createAccount({
          id: "69",
          username: "your.mom",
          password: "password",
        });
        const deleteAcc = manager.deleteAccount("1");

        expect(deleteAcc).toBeFalsy();
      });
    });
  });
});
