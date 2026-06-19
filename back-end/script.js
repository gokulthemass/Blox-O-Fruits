const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'credentials.json');

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// Test functions (run locally)
function addUser(name, gmail, password) {
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  data.push({ name, gmail, password });
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  console.log('User added:', data);
}

function getUsers() {
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  console.log('All users:', data);
}

// Example usage:
// addUser('Test', 'test@gmail.com', 'test123');
// getUsers();