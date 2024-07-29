import React from "react";
import { TailSpin } from "react-loader-spinner";

const Miniloader = ({ color }) => {
  return <TailSpin height="25" width="25" color={color} />;
};

export default Miniloader;
