import styled from "styled-components";

export default function TopBar() {
  return <Top></Top>;
}

const Top = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 72px;
  background-color: #151515;
  display: flex;
  justify-content: space-between;
`;
