import { createClient } from "contentful";
import Image from "next/image";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "carLifePartnerBlogPosts",
  });
  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "carLifePartnerBlogPosts",
    "fields.slug": params.slug,
  });

  return {
    props: { post: items[0] },
  };
};

export default function PostDetails({ post }) {
  console.log(post);
  const {
    address,
    featuredImage,
    mainText,
    price,
    tags,
    time,
    title,
    youTube,
  } = post.fields;

  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return "error";
    }
  };

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: address.lat,
    lng: address.lon,
  };

  return (
    <SItemWrap>
      <SBanner>
        <SImage>
          <Image
            src={"https:" + featuredImage.fields.file.url}
            width={1500}
            height={300}
          />
        </SImage>
        <h2>{title}</h2>
      </SBanner>
      <SInfo>
        <ul>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <p>
          所要時間： {time} 分 / 料金： {price} 円
        </p>
      </SInfo>
      <SMedia>
        <iframe
          width="560"
          height="315"
          src={"https://www.youtube.com/embed/" + getYouTubeId(youTube)}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </SMedia>
      <SMain>
        <ReactMarkdown>{mainText}</ReactMarkdown>
      </SMain>
      <SAccess>
        <div className="text">
          <h3>アクセス</h3>
          <p>〒100-0014 東京都千代田区永田町１丁目７−１</p>
          <p>TEL: 03-3581-3100</p>
        </div>
        <div className="map">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={17}
            ></GoogleMap>
          </LoadScript>
        </div>
      </SAccess>
    </SItemWrap>
  );
}

const SItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  h2 {
    font-size: 40px;
    position: absolute;
    top: 40%;
  }
`;

const SImage = styled.div`
  height: 300px;
  img {
    object-fit: cover;
    object-position: 50% 50%;
    filter: brightness(60%);
  }
`;

const SInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  ul {
    display: flex;
    font-size: 20px;
    margin-bottom: 30px;
    li {
      border: 1px solid white;
      padding: 10px;
      border-radius: 10px;
      font-size: 20px;
      margin-right: 30px;
    }
  }
  p {
    font-size: 25px;
    margin-bottom: 20px;
  }
`;

const SMedia = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
`;

const SAccess = styled.div`
  width: 80%;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  margin: 50px;
  .text {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 40px;
      margin: 20px;
    }
    p {
      margin: 10px;
    }
  }
`;

const SMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  h1 {
    font-size: 60px;
    margin: 30px;
  }
  h2 {
    font-size: 50px;
    margin: 25px;
  }
  h3 {
    font-size: 40px;
    margin: 20px;
  }
  h4 {
    font-size: 30px;
    margin: 15px;
  }
  p {
    font-size: 20px;
    line-height: 30px;
    margin: 10px;
  }
`;
