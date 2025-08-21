const express = require("express");
const app = express();
const PORT = 4000;
app.use(express.json());
let users = [];
function middleware(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.json({
            msg: " User access not given! Username & Password required."
        });
    }

}
app.post("/signup", middleware, async function (req, res) {
    const { username, password } = req.body;
    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.json({ msg: "⚠️ User already exists!" });
    }
   users.push({ username, password });
    res.json({
        msg: "User Signup Done!",
        users
    });
});
app.post("/register", middleware, async function (req, res) {
    const { username, password } = req.body;
    users.push({ username, password });
    res.json({
        msg: " User Registered Successfully!",
        users
    });
});
app.post("/login", middleware, async function (req, res) {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        return res.json({ msg: "Login Successful!" });
    } else {
        return res.json({ msg: " Invalid username or password!" });
    }
});
// ✅ Update User (PUT)
app.put("/update", middleware, async function (req, res) {
    const { username, password, newPassword } = req.body;

    let user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.json({ msg: "User not found or wrong password!" });
    }

    user.password = newPassword; // update password
    res.json({ msg: "Password updated successfully!", users });
});

// ✅ Delete User (DELETE)
app.delete("/delete", middleware, async function (req, res) {
    const { username, password } = req.body;

    const index = users.findIndex(u => u.username === username && u.password === password);

    if (index === -1) {
        return res.json({ msg: "User not found or wrong password!" });
    }

    users.splice(index, 1); // delete user
    res.json({ msg: "User deleted successfully!", users });
});
app.get("/", (req, res) => {
    res.send("Server is running! Use /signup, /register, /login, or /users");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
