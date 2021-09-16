import styled from "styled-components";
import React from "react";
export default function TopBar() {
  return <Top></Top>;
}

const Top = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 70px;
  background-color: #151515;
  display: flex;
  justify-content: space-between;
`;
