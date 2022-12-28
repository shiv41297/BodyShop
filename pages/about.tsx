import React from "react";
import { wrapper } from "../store/store";
import { incrementCounter } from "../store/counter/action";

const About = () => {
  return <div>About</div>;
};

export default About;

//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps((store) => () => {
  store.dispatch(incrementCounter());
});
