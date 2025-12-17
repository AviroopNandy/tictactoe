import express from "express";
import userRoutes from "./routes/users.js";

const app = express();

app.get('/', (req, res) => {
    res.send("Express.js server for tic-tac-toe");
});

app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});