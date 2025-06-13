const NetDB = require("./netdb");
const db = NetDB("http://localhost:4000", "your_super_secret_api_key_here");

async function main() {
  try {
    //await db.createTable("users", "id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), age INT");
    
    //await db.insert("users", { name: "Linus", age: 13 });
    //const rows = await db.view("users");
    //console.log("Users:", rows);

    //await db.update("users", { age: 14 }, { name: "Linus" });
    //const sqlResult = await db.rawSQL("SELECT * FROM users WHERE age > ?", [12]);
    //console.log("Raw SQL:", sqlResult);

    //await db.update("users", { age: 14 }, { name: "Linus" });

    //const updatedUsers = await db.view("users");
    //console.log("Users after update:", updatedUsers);

    //const sqlResult = await db.rawSQL("SELECT * FROM users WHERE age > ?", [12]);
    //console.log("Raw SQL result:", sqlResult);

    //await db.delete("users", { name: "Linus" });
    //await db.dropTable("users");

  } catch (err) {
    console.error("Error:", err.message);
  }
}

main();