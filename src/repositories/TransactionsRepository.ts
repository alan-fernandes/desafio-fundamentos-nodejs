import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accoumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            // eslint-disable-next-line no-param-reassign
            accoumulator.income += transaction.value;
            break;
          case 'outcome':
            // eslint-disable-next-line no-param-reassign
            accoumulator.outcome += transaction.value;
            break;
          default:
            break;
        }
        return accoumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    let total = 0;
    total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
