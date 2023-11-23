import React from "react";
import {Chip} from "@nextui-org/react";

export default function ChipArrow({children}) {
  return (
    <Chip className="shadow-md borderOrange backgroundOrangeChip text-white" variant="light">
      <span className="flex flex-wrap font-semibold">
         <span className="iconArrow mr-1"></span>{children} 
      </span>
    </Chip>
     
  );
}
