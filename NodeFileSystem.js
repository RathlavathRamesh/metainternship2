const fs = require("fs");

const inputFile = "expressMiddleware.js";
const outputFile = "expressRoutefetch.js";

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error(`Error reading file ${inputFile}:`, err);
    return;
  }

  try {
    const userData = JSON.parse(data);

    const modifiedUserData = addTotalPosts(userData);

    fs.writeFile(
      outputFile,
      JSON.stringify(modifiedUserData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error(`Error writing file ${outputFile}:`, err);
        } else {
          console.log(`File ${outputFile} has been written successfully.`);
        }
      }
    );
  } catch (parseError) {
    console.error(`Error parsing JSON in file ${inputFile}:`, parseError);
  }
});

function addTotalPosts(userData) {
  return userData.map((user) => ({
    ...user,
    totalPosts: user.posts.length,
  }));
}
