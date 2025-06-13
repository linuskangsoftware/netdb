# NetDB: Easy database management endpoints

NetDB is a very easy safe and secure solution to expose your database endpoints out to the real world. It is optimised for Roblox, with a provided Module and example script to make managing your database easy.

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

After that, import the javascript module and example script and follow the api docs there.

## License & Credit

NetDB is licensed under the Apache-2.0 License. View the full license [here](). You are allowed to do the following:

✅ Use, modify, and distribute the software freely, for personal or commercial use

✅ Include it in proprietary projects

✅ Create and distribute derivative works

Under the following:

⚖️ You must not change what the license permits in any distribution.

🏷️ You must give appropriate credit to the original author.

🔒 You must state any significant changes you make to the code.

Built with ❤️ by Linus Kang. Contributions and feedback are welcome.
