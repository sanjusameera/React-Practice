const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Get posts
export const getPosts = async () => {
  const response = await fetch(`${API_URL}?_limit=10`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

// Create a post
export const createPost = async (post) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
};

// Delete a post
export const deletePost = async (postId) => {
  const response = await fetch(`${API_URL}/${postId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  return true;
};