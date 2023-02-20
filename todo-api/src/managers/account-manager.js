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

class AccountManager{
  constructor({ accounts } = {}){
    this.accounts = accounts || [];
  }
  listAccounts(){
    return this.accounts;
  }
  findAccountByUsername(username){
    return this.accounts.find((account) => {
      return account.username === username;
    });
  }
  isUsernameTaken(username){
    return this.accounts.some((account) => account.username === username);
  }
  createAccount({ id, username, password}){
    if (this.isUsernameTaken(username)) {
      throw new Error("Username already taken");
    };  
    const account = new Account({
      id: id || nanoid(),
      username: username,
      password: hashSync(password, 10),
    });
    this.accounts.push(account);
    return account;
  }
  deleteAccount(id){
    const accountToDelete = this.accounts.findIndex((account) =>{
      return account.id === id;
    });
    if(accountToDelete === -1){
     return false;
    }
    this.accounts.splice(accountToDelete, 1);
    return true;
  }
}

export { AccountManager, Account };
