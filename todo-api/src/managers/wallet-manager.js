function transactionError(error, { source, destination, amount }) {
    return { success: false, error, source, destination, amount };
  }
  
  function transactionSuccess({ source, destination, amount }) {
    return { success: true, source, destination, amount };
  }
  
  class WalletManager{
    constructor({ createAccountManager } = {}, { createTransactionLedger } = {}){
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
      function transfer(source, destination, amount) {
        const source_account = findAccount(source);
        const dest_account = findAccount(destination);
    
        if (source_account === undefined) {
          return transactionError("Invalid source account", {
            source,
            destination,
            amount,
          });
        }
    
        if (dest_account === undefined) {
          return transactionError("Invalid destination account", {
            source,
            destination,
            amount,
          });
        }
    
        if (source_account.balance < amount) {
          return transactionError("Insufficient balance", {
            source,
            destination,
            amount,
          });
        }
    
        source_account.balance = source_account.balance - amount;
        dest_account.balance = dest_account.balance + amount;
    
        transactions.addTransaction({ account: source, amount: -amount }); // 🤷
        transactions.addTransaction({ account: destination, amount });
        return transactionSuccess({ source, destination, amount });
      }
    
      return { accounts, findAccount, createAccount, transfer };
    }

    function createTransactionLedger() {
      const transactions = [];
    
      function addTransaction({ account, amount }) {
        transactions.push({ account, amount, timestamp: new Date() });
      }
        
      function findAccountTransactions(account) {
        return transactions.filter((transaction) => {
          return transaction.account === account;
        });
      }
    
      return { transactions, addTransaction, findAccountTransactions };
    }
  
    const transactions = createTransactionLedger();
    const accounts = createAccountManager(transactions);
  
    return { accounts, transactions };
  }
}
  
export { WalletManager };