import { createClient } from "contentful";
import { PostCard } from "../components/PostCards";
import styled from "styled-components";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    content_type: "carLifePartnerBlogPosts",
  });

  return {
    props: {
      posts: res.items,
    },
  };
};

export default function Posts({ posts }) {
  console.log(posts);
  return (
    <SPostList>
      {posts.map((post) => (
        <PostCard key={post.sys.id} post={post} />
      ))}
    </SPostList>
  );
}

const SPostList = styled.div`
  display: flex;
  flex-direction: column;
`;
