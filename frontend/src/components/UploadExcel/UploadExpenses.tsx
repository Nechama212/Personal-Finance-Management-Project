import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Expense } from '../Transactions/TransactionsTypes';

interface UploadExpensesProps {
  userEmail: string;
  createExpense: (newExpense: Omit<Expense, 'ExpenseID'>) => void;
}

interface RowData {
  Description: string;
  Amount: number;
  Date: string | number; // Date can be string or number (Excel date serial)
  CategoryName: string;
}

const UploadExpenses: React.FC<UploadExpensesProps> = ({ userEmail, createExpense }) => {
  const [error, setError] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Omit<Expense, 'ExpenseID'>[]>([]);

  // Convert Excel date serial number to a JavaScript Date object
  const convertExcelDateToJSDate = (excelDate: number) => {
    const epoch = new Date(1899, 11, 31); // 31 Dec 1899 (Excel's epoch date)
    epoch.setDate(epoch.getDate() + excelDate);
    return epoch;
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError('No file selected.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      console.log('Data from file:', jsonData); // Add this line to debug the file data

      try {
        const processedExpenses: Omit<Expense, 'ExpenseID'>[] = (jsonData as RowData[]).map((row, index) => {
          console.log(`Processing row ${index + 1}:`, row); // Add this line to debug each row

          // Validate required fields
          if (!row.Description || row.Amount === undefined || !row.Date || !row.CategoryName) {
            throw new Error(`Missing required fields in row ${index + 1}.`);
          }

          // Convert Excel serial date to JavaScript Date if necessary
          let date = row.Date;
          if (typeof date === 'number') {
            date = convertExcelDateToJSDate(date).toISOString().split('T')[0];
          } else if (typeof date === 'string') {
            date = new Date(date).toISOString().split('T')[0]; // Ensure "yyyy-MM-dd" format
          }

          return {
            Description: row.Description,
            Amount: parseFloat(row.Amount.toString()) || 0, // Ensure Amount is a number
            Date: date,
            CategoryName: row.CategoryName,
            UserEmail: userEmail, // Use provided email
          };
        });

        setExpenses(processedExpenses);
        setError(null); // Clear errors on success
      } catch (error) {
        console.error('Error processing file:', error);
        setError('Error processing file. Please check the format.');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Upload all expenses
  const handleUploadExpenses = () => {
    if (expenses.length === 0) {
      setError('No expenses to upload.');
      return;
    }

    // Upload each expense to the backend
    expenses.forEach(createExpense);
    setError(null); // Clear errors on success
  };

  return (
    <div>
      <h3>Upload Expenses</h3>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {expenses.length > 0 && (
        <div>
          <h4>Data Preview</h4>
          <div style={{ overflowY: 'auto', maxHeight: '400px' }}> {/* Allows scrolling if too many rows */}
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index}>
                    <td>{expense.Description}</td>
                    <td>{expense.Amount}</td>
                    <td>{expense.Date}</td>
                    <td>{expense.CategoryName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={handleUploadExpenses}>Upload Expenses</button>
        </div>
      )}
    </div>
  );
};

export default UploadExpenses;