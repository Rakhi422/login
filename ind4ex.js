const express = require("express");
const app = express();
const PORT = 4000;

// ✅ Middleware
app.use(express.json());

// ✅ In-memory users storage (temporary DB)
let users = [];

// ✅ Middleware function (check username & password)
function middleware(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.json({
            msg: "❌ User access not given! Username & Password required."
        });
    }
    next(); // sab sahi hai toh route chalega
}

// ✅ Signup Route
app.post("/signup", middleware, async function (req, res) {
    const { username, password } = req.body;

    // Check if user already exists
    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.json({ msg: "⚠️ User already exists!" });
    }

    users.push({ username, password });
    res.json({
        msg: "✅ User Signup Done!",
        users
    });
});

// ✅ Register Route
app.post("/register", middleware, async function (req, res) {
    const { username, password } = req.body;
    users.push({ username, password });
    res.json({
        msg: "✅ User Registered Successfully!",
        users
    });
});

// ✅ Login Route
app.post("/login", middleware, async function (req, res) {
    const { username, password } = req.body;

    // Simple check against stored users
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        return res.json({ msg: "✅ Login Successful!" });
    } else {
        return res.json({ msg: "❌ Invalid username or password!" });
    }
});

// ✅ All Users Route (for testing only)
app.get("/users", (req, res) => {
    res.json(users);
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
