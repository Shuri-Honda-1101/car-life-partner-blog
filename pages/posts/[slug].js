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
    tel,
    addressText,
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
    width: "calc(400 / 1440 * 100vw)",
    height: "calc(400 / 1440 * 100vw)",
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
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </SMedia>
      <SMain>
        <ReactMarkdown>{mainText}</ReactMarkdown>
      </SMain>
      <SAccessWrap>
        <h3>アクセス</h3>
        <SAccess>
          <div className="text">
            <p>{addressText}</p>
            <p>TEL : {tel}</p>
          </div>
          <div className="google-map">
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
      </SAccessWrap>
    </SItemWrap>
  );
}

const SItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #242323;
`;

const SBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  h2 {
    font-size: min(calc(40 / 1440 * 100vw), 40px);
    position: absolute;
    top: 40%;
  }
`;

const SImage = styled.div`
  height: calc(300 / 1440 * 100vw);
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
  margin: calc(50 / 1440 * 100vw) 0;
  ul {
    display: flex;
    margin-bottom: calc(30 / 1440 * 100vw);
    li {
      font-size: min(calc(20 / 1440 * 100vw), 20px);
      border: 1px solid white;
      padding: calc(10 / 1440 * 100vw);
      border-radius: calc(10 / 1440 * 100vw);
      margin-right: calc(30 / 1440 * 100vw);
    }
  }
  p {
    font-size: min(calc(25 / 1440 * 100vw), 25px);
    margin-bottom: calc(20 / 1440 * 100vw);
  }
`;

const SMedia = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: calc(20 / 1440 * 100vw);
  iframe {
    width: 70%;
    object-fit: cover;
  }
`;

const SAccessWrap = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: min(calc(40 / 1440 * 100vw), 40px);
    margin: calc(20 / 1440 * 100vw);
  }
`;

const SAccess = styled.div`
  width: 100%;
  display: flex;
  font-size: min(calc(20 / 1440 * 100vw), 18px);
  justify-content: center;
  margin: calc(50 / 1440 * 100vw);
  .text {
    margin-right: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      margin: calc(10 / 1440 * 100vw);
    }
  }
`;

const SMain = styled.div`
  margin: calc(50 / 1440 * 100vw);
  width: 80%;
  border-bottom: 1px solid white;
  border-top: 1px solid white;
  padding: calc(30 / 1440 * 100vw) 0;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: min(calc(60 / 1440 * 100vw), 60px);
    margin: calc(35 / 1440 * 100vw);
  }
  h2 {
    font-size: min(calc(50 / 1440 * 100vw), 50px);
    margin: calc(30 / 1440 * 100vw);
  }
  h3 {
    font-size: min(calc(40 / 1440 * 100vw), 40px);
    margin: calc(25 / 1440 * 100vw);
  }
  h4 {
    font-size: min(calc(30 / 1440 * 100vw), 30px);
    margin: calc(20 / 1440 * 100vw);
  }
  p {
    width: 100%;
    font-size: min(calc(17 / 1440 * 100vw), 17px);
    line-height: min(calc(25 / 1440 * 100vw), 25px);
    margin: calc(11 / 1440 * 100vw);
  }

  li {
    list-style: inside;
    font-size: min(calc(18 / 1440 * 100vw), 18px);
    line-height: min(calc(25 / 1440 * 100vw), 25px);
    margin: calc(12 / 1440 * 100vw);
  }
  img {
    width: 100%;
    object-fit: cover;
  }
`;
