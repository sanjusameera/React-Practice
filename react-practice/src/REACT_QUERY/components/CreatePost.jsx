import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/postsApi";

function CreatePost() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const createMutation = useMutation({
    mutationFn: createPost,

    onSuccess: (newPost) => {
      // Add the newly created post to the existing React Query cache
      queryClient.setQueryData(["posts"], (oldPosts = []) => {
        return [newPost, ...oldPosts];
      });

      // Clear the form
      setTitle("");
      setBody("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      return;
    }

    createMutation.mutate({
      title,
      body,
      userId: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="create-form">
      <h2>Create Post</h2>

      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Post body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows="4"
      />

      <button type="submit" disabled={createMutation.isPending}>
        {createMutation.isPending ? "Creating..." : "Create Post"}
      </button>

      {createMutation.isError && (
        <p className="error">
          Failed to create post: {createMutation.error.message}
        </p>
      )}

      {createMutation.isSuccess && (
        <p className="success">Post created successfully!</p>
      )}
    </form>
  );
}

export default CreatePost;