import React from "react";
import styled from "styled-components";

export default props => {
  const { id, gray } = props;

  const baseUrl = "https://ovicklep.sirv.com/osrs/";
  const postFix = ".png";

  const style = {
    width: "24px",

    ...(gray ? { filter: "grayscale(100%)" } : {}),
    height: "auto",
    maxHeight: "35px",

    ...props.style
  };

  return <Img style={style} alt={id} src={baseUrl + id + postFix} />;
};

const Img = styled.img`
  margin-right: 5px;
  ${props => props.style};
  src: ${props => props.src};
`;
