import { useActiveMap } from "@/context/ActiveMapContext";
import React from "react"

type BuildingProps = {
  id: string,
  d: string,
  className: string,
}

export const Building = ({ id, d, className }: BuildingProps ) => {
  const { activeMap, setActiveMap } = useActiveMap();
  const name = id.replaceAll('_', ' ');

  return (
    <path
      id={id}
      d={d}
      className={className}
      onClick={() => {
        setActiveMap(id)
      }}
    />
 );
}

const defaultColor = "fill-primary";

export const cheneyHall = <Building
    id="Cheney_Hall"
    className={defaultColor}
    d="M7.05,177.13L.89,134.84c-.49-3.39,1.81-6.56,5.19-7.14l151.31-25.76c3.5-.6,6.8,1.8,7.31,5.31l6.16,42.28c.49,3.39-1.81,6.56-5.19,7.14L14.36,182.44c-3.5.6-6.8-1.8-7.31-5.31Z"
  />

export default Building;