const axios = require("axios");

// Function to fetch data from JSONPlaceholder API
async function fetchUserData() {
  try {
    // Fetch users
    const usersResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users = usersResponse.data;

    // Fetch posts for each user
    const postsPromises = users.map(async (user) => {
      const postsResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
      );
      const posts = postsResponse.data;
      //console.log(posts);
      return { ...user, posts };
    });

    // Wait for all posts promises to resolve
    const usersWithPosts = await Promise.all(postsPromises);

    return usersWithPosts;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

// Example UseCase.
fetchUserData()
  .then((data) => {
    console.log("Users with their posts:", data);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
