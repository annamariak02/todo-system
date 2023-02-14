function transactionError(error, { source, destination, amount }) {
    return { success: false, error, source, destination, amount };
  }
  
  function transactionSuccess({ source, destination, amount }) {
    return { success: true, source, destination, amount };
  }
  
  // now let's hook up the ledger to the account manager
  function createAccountManager(transactions) {
    const accounts = [];
  
    function findAccount(account_name) {
      return accounts.find((account) => {
        return account.name === account_name;
      });
    }
    function createAccount(account_name, starting_balance) {
      accounts.push({
        name: account_name,
        balance: starting_balance,
      });
    }
  
    /**
     * If the transfer can be made, a transaction should be created.
     * Use: transactions.addTransaction
     * but only if the transaction is successful
     */
    function transfer(source, destination, amount) {
      const source_account = findAccount(source);
      const dest_account = findAccount(destination);
  
      // 1. the source account has to exist
      if (source_account === undefined) {
        return transactionError("Invalid source account", {
          source,
          destination,
          amount,
        });
      }
  
      // 2. the destination account has to exist
      if (dest_account === undefined) {
        return transactionError("Invalid destination account", {
          source,
          destination,
          amount,
        });
      }
  
      // 3. return an error if the account does not have enough balance
      if (source_account.balance < amount) {
        return transactionError("Insufficient balance", {
          source,
          destination,
          amount,
        });
      }
  
      source_account.balance = source_account.balance - amount;
      dest_account.balance = dest_account.balance + amount;
  
      // mine paranda findAccountTransactions ära
      transactions.addTransaction({ account: source, amount: -amount }); // 🤷
      transactions.addTransaction({ account: destination, amount });
      return transactionSuccess({ source, destination, amount });
    }
  
    return { accounts, findAccount, createAccount, transfer };
  }
  function createTransactionLedger() {
    const transactions = [];
  
    /**
     * This function should add a transaction to the ledger
     */
    function addTransaction({ account, amount }) {
      transactions.push({ account, amount, timestamp: new Date() });
    }
  
    /**
     * This function should return all the transactions made with this account
     */
  
    function findAccountTransactions(account) {
      return transactions.filter((transaction) => {
        return transaction.account === account;
      });
    }
  
    return { transactions, addTransaction, findAccountTransactions };
  }
  
  export function createBank() {
    const transactions = createTransactionLedger();
    const accounts = createAccountManager(transactions);
  
    return { accounts, transactions };
  }