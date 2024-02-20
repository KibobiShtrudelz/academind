import { useRouter } from "next/router";

// Трите точки в името на файла са "catch all" сегменти от URL-а след "/blog" и Next ще ни ги връща като масив в router.query
export default function BlogPostsPage() {
  const router = useRouter();

  return (
    <div>
      <h1>The Blog Posts</h1>
    </div>
  );
}
