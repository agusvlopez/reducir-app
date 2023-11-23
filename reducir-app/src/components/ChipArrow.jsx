import React from "react";
import {Chip} from "@nextui-org/react";
import arrowIcon from "../covers/icons/down-arrow.png";

export default function ChipArrow({children}) {
  return (
    <Chip className="shadow-md borderOrange" variant="bordered"> <img src={arrowIcon} className="inline-block" /> {children}</Chip>
  );
}
