# NetDB: Easy database management endpoints

NetDB is a very easy safe and secure solution to expose your MariaDB database endpoints out to the real world.

## Getting started

```bash
# Install MariaDB
sudo apt install mariadb
sudo mysql

# Create your database
create database YOUR_DATABASE_NAME;

# Create database user
CREATE USER 'NetDBClient'@'localhost' IDENTIFIED BY 'YOUR_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON YOUR_DATABASE_NAME.* TO 'NetDBClient'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Clone repo & install dependencies
git clone https://github.com/linuskangsoftware/netdb
cd netdb
npm install
```

Create a ``.env`` inside ``/netdb``

```
PORT=3000

DB_HOST=localhost
DB_USER=NetDBClient
DB_PASSWORD=YOUR_PASSWORD_HERE
DB_NAME=YOUR_DATABASE_NAME

API_KEY=your_super_secret_api_key_here
```

Start the server

```bash
npm run dev
```

Now you have your database & backend fully setup. If your not using a cloud service to host, you will need to port forward your webserver to the open world. I prefer to use ``Cloudflared`` and Zero Trust on cloudflare for this.

You can view the list of endpoints and example usages in the ``APIs.txt`` file.

## Using the provided javascript module

Access the source for the module and example code [here](https://github.com/linuskangsoftware/netdb/tree/main/clientModules/javascriptModule)

Create a new NodeJS project

```bash
mkdir NetDBTest
cd NetDBTest
npm init -y
npm install node-fetch
mkdir src
```

Paste ``netdb.js`` inside of ``/src/netdb.js``. The code available from the link above or [here](https://github.com/linuskangsoftware/netdb/tree/main/clientModules/javascriptModule/netdb.js).

Next, create a new javascript file in ``/NetDBTest/example.js`` and paste in this available [here](https://github.com/linuskangsoftware/netdb/tree/main/clientModules/javascriptModule/example.js).

```javascript
const NetDB = require("./src/netdb");
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
```

The script above gives you examples on the entire javascript module framework for interfacing your NetDB database.

## License & Credit

NetDB is licensed under the Apache-2.0 License. View the full license [here](https://github.com/linuskangsoftware/netdb/blob/main/LICENSE). You are allowed to do the following:

✅ Use, modify, and distribute the software freely, for personal or commercial use

✅ Include it in proprietary projects

✅ Create and distribute derivative works

Under the following:

⚖️ You must not change what the license permits in any distribution.

🏷️ You must give appropriate credit to the original author.

🔒 You must state any significant changes you make to the code.

Built with ❤️ by Linus Kang. Contributions and feedback are welcome.
