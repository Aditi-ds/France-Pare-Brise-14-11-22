import * as React from "react";

type services = {
  c_aboutSection: any;
};
const About = (props: services) => {
  const { c_aboutSection } = props;

  //  console.log(c_aboutSection,"about")
  return (
    <>
      <div className="section">
        <div className="grid grid-cols-2 gap-4 mt-8 ml-6">
          <div>
            <h1 className="text-2xl text-[#001f46] mt-2">{c_aboutSection.title}</h1>
            <p className="mt-4 text-sm w-10/12">{c_aboutSection.description}</p>
            <div className="mt-4">
              <a href="#">{c_aboutSection?.cta?.label}</a>
            </div>
          </div>
          <div>
            <img className="w-10/12 h-72 ml-6" src={c_aboutSection?.image?.url} ></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;