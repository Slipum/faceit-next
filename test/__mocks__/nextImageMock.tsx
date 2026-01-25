import * as React from "react";

const NextImage = ({ src, alt, ...props }: any) => {
  // Render a normal img in tests
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={typeof src === "string" ? src : ""} alt={alt} {...props} />;
};

export default NextImage;
