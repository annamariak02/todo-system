function transactionError(error, { source, destination, amount }) {
  return { success: false, error, source, destination, amount };
}

function transactionSuccess({ source, destination, amount }) {
  return { success: true, source, destination, amount };
}

class WalletManager {
  constructor({ wallets } = {}) {
    this.wallets = wallets || [];
    this.transactions = new TransactionLedger();
  }
  findWallet(wallet_name) {
    return this.wallets.find((wallet) => {
      return wallet.name === wallet_name;
    });
  }
  createWallet(wallet_name, starting_balance) {
    this.wallets.push({
      name: wallet_name,
      balance: starting_balance,
    });
  }
  transfer(source, destination, amount) {
    const source_wallet = this.findWallet(source);
    const dest_wallet = this.findWallet(destination);

    if (source_wallet === undefined) {
      return transactionError("Invalid source wallet", {
        source,
        destination,
        amount,
      });
    }
    if (dest_wallet === undefined) {
      return transactionError("Invalid destination wallet", {
        source,
        destination,
        amount,
      });
    }
    if (source_wallet.balance < amount) {
      return transactionError("Insufficient balance", {
        source,
        destination,
        amount,
      });
    }

    source_wallet.balance = source_wallet.balance - amount;
    dest_wallet.balance = dest_wallet.balance + amount;

    this.transactions.addTransaction({ wallet: source, amount: -amount }); // 🤷
    this.transactions.addTransaction({ wallet: destination, amount });
    return transactionSuccess({ source, destination, amount });
  }
}

class TransactionLedger {
  constructor({ transactions } = {}) {
    this.transactions = transactions || [];
  }
  addTransaction({ wallet, amount }) {
    this.transactions.push({ wallet, amount, timestamp: new Date() });
  }

  findWalletTransactions(wallet) {
    return this.transactions.filter((transaction) => {
      return transaction.wallet === wallet;
    });
  }
}

export { WalletManager, TransactionLedger };
