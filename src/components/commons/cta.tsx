import * as React from "react";

type Cta = {
  buttonText: string;
  url: string;
  style?: string;
};

const Cta = (props: Cta) => {
  const { buttonText, url, style } = props;

  return (
    <a
      href={url}
      className={
         "bg-[#001f46] text-white text-sm p-4 hover:bg-white border-solid border-2 border-[#001f46] hover:text-[#001f46] mt-4"
      }
      target="_self"
      rel="noopener noreferrer"
    >
      {buttonText}
    </a>
  );
};

export default Cta;
