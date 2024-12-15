"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Home route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Test connection route
app.get('/test-connection', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Error fetching users' });
    }
}));
// Importing routes
const users_1 = require("./routes/users");
const expenses_1 = require("./routes/expenses");
const incomes_1 = require("./routes/incomes");
const savingGoals_1 = require("./routes/savingGoals");
const monthlyBudgets_1 = require("./routes/monthlyBudgets");
const analytics_1 = require("./routes/analytics");
const categories_1 = require("./routes/categories"); // Import the categories router
// Using routes
app.use('/api/users', users_1.usersRouter);
app.use('/api/expenses', expenses_1.expensesRouter);
app.use('/api/incomes', incomes_1.incomesRouter);
app.use('/api/savingGoals', savingGoals_1.savingGoalsRouter);
app.use('/api/monthlyBudgets', monthlyBudgets_1.monthlyBudgetsRouter);
app.use('/api/analytics', analytics_1.analyticsRouter);
app.use('/api/categories', categories_1.categoriesRouter); // Use the categories router
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: err.message });
});
// Starting the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Try accessing http://localhost:${port} in your browser`);
});
