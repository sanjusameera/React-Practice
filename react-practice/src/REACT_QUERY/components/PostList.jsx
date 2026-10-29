import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, getPosts } from "../api/postsApi";

function PostList() {
  const queryClient = useQueryClient();

  // Fetch posts
  const {
    data: posts,
    isPending,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  // Delete post
  const deleteMutation = useMutation({
    mutationFn: deletePost,

    onSuccess: (_, deletedPostId) => {
      // Remove the deleted post from React Query cache
      queryClient.setQueryData(["posts"], (oldPosts = []) => {
        return oldPosts.filter((post) => post.id !== deletedPostId);
      });
    },
  });

  const handleDelete = (postId) => {
    deleteMutation.mutate(postId);
  };

  if (isPending) {
    return <p>Loading posts...</p>;
  }

  if (isError) {
    return <p className="error">Error: {error.message}</p>;
  }

  return (
    <div className="post-list">
      <div className="list-header">
        <h2>Posts</h2>

        {isFetching && <span>Refreshing...</span>}
      </div>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div className="post-card" key={post.id}>
            <div>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>

            <button
              onClick={() => handleDelete(post.id)}
              disabled={
                deleteMutation.isPending &&
                deleteMutation.variables === post.id
              }
            >
              {deleteMutation.isPending &&
              deleteMutation.variables === post.id
                ? "Deleting..."
                : "Delete"}
            </button>
          </div>
        ))
      )}

      {deleteMutation.isError && (
        <p className="error">
          Failed to delete post: {deleteMutation.error.message}
        </p>
      )}
    </div>
  );
}

export default PostList;