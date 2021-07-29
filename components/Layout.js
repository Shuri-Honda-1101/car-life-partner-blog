import Link from "next/link";
import styled from "styled-components";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <SHEADER>
        <Link href="/">
          <a>
            <h1>Car Life Partner</h1>
          </a>
        </Link>
      </SHEADER>

      <SPropContent>{children}</SPropContent>

      <SFooter>
        <p>Copyright 2021 PlogLab</p>
      </SFooter>
    </div>
  );
}

const SHEADER = styled.header`
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(/header-bgi.jpeg);
  height: calc(440 / 1440 * 100vw);
  background-size: cover;
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  h1 {
    font-family: Verdana;
    font-size: calc(70 / 1440 * 100vw);
    text-shadow: 0 calc(3 / 1440 * 100vw) calc(6 / 1440 * 100vw)
      rgba(0, 0, 0, 0.16);
    margin-left: calc(50 / 1440 * 100vw);
    letter-spacing: calc(-2.5 / 1440 * 100vw);
    color: rgba(255, 255, 255, 0.85);
  }
`;

const SPropContent = styled.section`
  margin: 100px;
`;

const SFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100 / 1440 * 100vw);
`;
