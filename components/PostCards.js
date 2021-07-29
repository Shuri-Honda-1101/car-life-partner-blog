import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

export const PostCard = ({ post }) => {
  const { title, slug, thumbnail, price, time, summary } = post.fields;

  return (
    <>
      <SPostCard>
        <div>
          <Image
            src={"https:" + thumbnail.fields.file.url}
            width={400}
            height={400}
            // width={thumbnail.fields.file.details.image.width}
            // height={thumbnail.fields.file.details.image.height}
          />
        </div>
        <STextWrap>
          <div>
            <h4>{title}</h4>
            <p>所要時間： {time} 分</p>
            <p>料金： {price} 円</p>
          </div>
          <SSummary>
            <p>{summary}</p>
          </SSummary>
          <SLinkWrap>
            <Link href={"/posts/" + slug}>
              <a>詳細を見る</a>
            </Link>
          </SLinkWrap>
        </STextWrap>
      </SPostCard>
    </>
  );
};

const SPostCard = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: calc(50 / 1440 * 100vw);
  height: 400px;
`;

const STextWrap = styled.div`
  margin-left: calc(30 / 1440 * 100vw);
  width: 55%;
  padding: calc(30 / 1440 * 100vw);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  h4 {
    font-size: 40px;
    margin-bottom: calc(30 / 1440 * 100vw);
  }
  p {
    font-size: 30px;
    margin-bottom: calc(20 / 1440 * 100vw);
  }
`;

const SLinkWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  a {
    font-size: 22px;
  }
`;

const SSummary = styled.div`
  p {
    font-size: 22px;
    line-height: 35px;
  }
`;
