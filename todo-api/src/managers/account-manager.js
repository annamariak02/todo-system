// https://www.npmjs.com/package/nanoid
import { nanoid } from "nanoid";

// https://www.npmjs.com/package/bcrypt
import { hashSync, compareSync } from "bcrypt";

class Account {
  /**
   * @param { string | null } id
   *  The unique ID for this account, or null to have one generated
   * @param { string } username
   *  The username of this account
   * @param { string } password
   *  The password hash of this account
   */
  constructor({ id, username, password }) {
    // TODO: Generate a random ID if one is not specified
    this.id = id || nanoid();
    this.username = username;
    this.password = password;
  }

  /**
   * Verifies whether the password matches
   * @param { string } password The plain-text password to check
   */
  verifyPassword(password) {
    return compareSync(password, this.password);
  }
}

/** @constructor */
function AccountManager() {
  if (this instanceof AccountManager === false) {
    return new AccountManager();
  }

  /** @type {Array<Account>} */
  this.accounts = [];
}

/**
 * Returns a list of all accounts.
 * @returns { Array<Account> }
 */
AccountManager.prototype.listAccounts = function () {
  return this.accounts;
};

/**
 * Finds an account with the matching username.
 * @param { string } username The username to search for
 * @returns { Account | undefined }
 *  The account with the matching username or undefined if the user was not found
 */
AccountManager.prototype.findAccountByUsername = function (username) {
  return this.accounts.find((account) => {
    return account.username === username;
  });
};

AccountManager.prototype.isUsernameTaken = function (username) {
  return this.accounts.some((account) => account.username === username);
};
/**
 * Creates a new account
 * @param {string} username
 * @param {string} password
 * @returns {Account}
 */
AccountManager.prototype.createAccount = function ({ id, username, password }) {
  if (this.isUsernameTaken(username)) {
    throw new Error("Username already taken");
  }

  const account = new Account({
    id: id || nanoid(),
    username: username,
    password: hashSync(password, 10),
  });
  this.accounts.push(account);
  return account;
};

/**
 * Deletes an account
 * @param {string} id
 * @returns {boolean}
 */
AccountManager.prototype.deleteAccount = function (id) {};

export { AccountManager, Account };
