// Import dependencies
const XLSX = require("xlsx");
const axios = require("axios");

// Read the file into memory
const xlsxFile = XLSX.readFile("file-example.xlsx");

// Convert the XLSX to JSON
const users = {};

for (const sheetName of xlsxFile.SheetNames) {
  users[sheetName] = XLSX.utils.sheet_to_json(xlsxFile.Sheets[sheetName]);
}

// Filter by American users
const americanUsers = users.Sheet1.filter(
  (user) => user.Country === "United States"
);

// Sent users to API
axios
  .post('https://jsonplaceholder.typicode.com/posts', americanUsers)
  .then((res) => {
    console.log(`statusCode: ${res.status}`);
    console.log(res.data);
  })
  .catch((error) => {
    console.error(error);
  });