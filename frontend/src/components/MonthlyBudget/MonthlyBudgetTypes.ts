export interface Expense {
    ExpenseID: number;
    CategoryName: string;
    Amount: number;
    Date: string;
  }
  
  export interface Budget {
    BudgetID: number;
    CategoryName: string;
    BudgetAmount: number;
    SpentAmount: number;
    BudgetMonth: string;
  }
  