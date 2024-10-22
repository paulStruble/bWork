import { checkDomainOfScale } from "recharts/types/util/ChartUtils";
import {Unit1, 
        Unit2, 
        Unit3, 
        Blackwell, 
        ClarkKerr, 
        FoothillStern, 
        AnchorHouse, 
        BeverlyCleary, 
        Bowles, 
        ChanningBowditch, 
        Crossroads, 
        MartinezCommons,
        BuildingColors} from "./requestMaps"

const calcTotalRequests = (buildingRequestCountsMap: BuildingRequestCountMap): number => {
  return Object.values(buildingRequestCountsMap).reduce((sum, count) => sum + count, 0)
}

const calcRequestProportions = (buildingRequestCountsMap: BuildingRequestCountMap) => {
  const totalRequests: number = calcTotalRequests(buildingRequestCountsMap);
  const requestProportions = Object.fromEntries(
    Object.entries(buildingRequestCountsMap).map(([building, count]) => [
      building,
      count / totalRequests
    ])
  );
  console.log(requestProportions);
  return requestProportions;
}

const calcFillColor = (proportion: number): string => {
  const hue = 220;
  const saturation = 50;
  const lightness = 80 - Math.log(proportion);
  // const lightness = 30;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

const calcBuildingColors = (buildingRequestCountsMap: BuildingRequestCountMap): BuildingColors => {
  const requestProportions = calcRequestProportions(buildingRequestCountsMap);
  const buildingColors: BuildingColors = Object.fromEntries(
    Object.entries(requestProportions).map(([building, proportion]) => [
      building.replace(/_/g, " "),
      calcFillColor(proportion)
    ])
  );
  return buildingColors;
}

export type BuildingRequestCount = {
  building: string,
  count: number,
}

export type BuildingRequestCountMap = {
  "Academic Center": number,
  "Anchor House": number,
  "Anna Head": number,
  "Beverly Cleary Ground": number,
  "Beverly Cleary Hall": number,
  "Blackwell Hall": number,
  "Bowles Ground": number,
  "Bowles Hall": number,
  "Cafe 3": number,
  "Central 1": number,
  "Central 2": number,
  "Central 3": number,
  "Central Distribution Facility": number,
  "Central Ground": number,
  "Channing Bowditch": number,
  "Channing Bowditch Ground": number,
  "Cheney Hall": number,
  "Childcare Center": number,
  "Christian Hall": number,
  "CK 24 Golden Bear Rec": number,
  "CK 25 Golden Bear Rec": number,
  "CK Building 1": number,
  "CK Building 10": number,
  "CK Building 11": number,
  "CK Building 12": number,
  "CK Building 13": number,
  "CK Building 14": number,
  "CK Building 15": number,
  "CK Building 16": number,
  "CK Building 17": number,
  "CK Building 18": number,
  "CK Building 19": number,
  "CK Building 2": number,
  "CK Building 20": number,
  "CK Building 21": number,
  "CK Building 23": number,
  "CK Building 3": number,
  "CK Building 4": number,
  "CK Building 5": number,
  "CK Building 5A (temp)": number,
  "CK Building 6": number,
  "CK Building 7": number,
  "CK Building 8": number,
  "CK Building 9": number,
  "Clark Kerr Campus All Buildings": number,
  "Clark Kerr Ground": number,
  "Common Grounds": number,
  "Community Center": number,
  "Crossroads": number,
  "Cunningham Hall": number,
  "Davidson Hall": number,
  "Deutsch Hall": number,
  "Dwight Child Development Center": number,
  "Ehrman Hall": number,
  "FH Building 1": number,
  "FH Building 2": number,
  "FH Building 3": number,
  "FH Building 4": number,
  "FH Building 5": number,
  "FH Building 6": number,
  "FH Building 7": number,
  "FH Building 8": number,
  "FH Building 9": number,
  "Foothill All Buildings": number,
  "Foothill Ground": number,
  "Freeborn Hall": number,
  "Girton Hall": number,
  "Golden Bear Cafe": number,
  "Griffiths Hall": number,
  "Grounds Shop": number,
  "Haas Pavillion": number,
  "Haste St. Child Development Center": number,
  "Ida Jackson Ground": number,
  "Ida Jackson House": number,
  "Ida Sproul Hall": number,
  "Infant Toddler Center": number,
  "Jones Study Center": number,
  "LBL Cafe": number,
  "LBL Guest House Hotel": number,
  "LHS Cafe": number,
  "Maintenance Shops": number,
  "Manville Ground": number,
  "Manville Hall": number,
  "Martin Luther King Jr Building": number,
  "Martinez Commons": number,
  "Memorial Stadium": number,
  "Memorial Stadium Fitness": number,
  "Norton Hall": number,
  "Pat Browns Grille": number,
  "Photo ID": number,
  "Priestley Hall": number,
  "Putnam Hall": number,
  "QualComm": number,
  "Ramonas Café": number,
  "Res Svcs Trailer": number,
  "RSF": number,
  "RSSB": number,
  "RSSB Ground": number,
  "RSSP- All Buildings": number,
  "SF Building 3002": number,
  "SF Building 3024": number,
  "SF Building E": number,
  "SF Building F": number,
  "SF Building G": number,
  "SF Building H": number,
  "SF Building J": number,
  "SF Building K (G/H Annex)": number,
  "SF Building L (E/F Annex)": number,
  "SF Central Building": number,
  "SF Community Center (temp)": number,
  "Slottman Hall": number,
  "Smyth Fernwald All Buildings": number,
  "Smyth Ground": number,
  "Spens Black Hall": number,
  "Stern Ground": number,
  "Stern Hall": number,
  "Strawberry Canyon Recreation": number,
  "Terrace Café": number,
  "Test": number,
  "The Intersection": number,
  "Towle Hall": number,
  "UC Aquatic Center": number,
  "Underhill Parking Lot": number,
  "Unit 1 All Buildings": number,
  "Unit 1 Ground": number,
  "Unit 2 All Buildings": number,
  "Unit 3 All Buildings": number,
  "Unit2 Ground": number,
  "Unit3 Ground": number,
  "University Health S. Tang Center": number,
  "University Terrace": number,
  "UV East Ground": number,
  "UV West Ground": number,
  "UVA-EV-L Laundry L1": number,
  "UVA-EV-L Laundry L2": number,
  "UVA-EV-L Laundry L3": number,
  "UVA-EV-L Laundry L4": number,
  "UVA-EV-L Laundry L5": number,
  "UVA-EV-L Laundry L6": number,
  "UVA-EV-L Laundry L7": number,
  "UVA-EV-L Laundry L8": number,
  "UVA-EV-L Laundry L9": number,
  "UVA-EV-L LaundryL10": number,
  "UVA-EV Building 100": number,
  "UVA-EV Building 101": number,
  "UVA-EV Building 102": number,
  "UVA-EV Building 103": number,
  "UVA-EV Building 104": number,
  "UVA-EV Building 105": number,
  "UVA-EV Building 106": number,
  "UVA-EV Building 107": number,
  "UVA-EV Building 108": number,
  "UVA-EV Building 109": number,
  "UVA-EV Building 110": number,
  "UVA-EV Building 111": number,
  "UVA-EV Building 112": number,
  "UVA-EV Building 113": number,
  "UVA-EV Building 114": number,
  "UVA-EV Building 115": number,
  "UVA-EV Building 116": number,
  "UVA-EV Building 117": number,
  "UVA-EV Building 118": number,
  "UVA-EV Building 119": number,
  "UVA-EV Building 120": number,
  "UVA-EV Building 121": number,
  "UVA-EV Building 122": number,
  "UVA-EV Building 123": number,
  "UVA-EV Building 124": number,
  "UVA-EV Building 125": number,
  "UVA-EV Building 126": number,
  "UVA-EV Building 127": number,
  "UVA-EV Building 128": number,
  "UVA-EV Building 129": number,
  "UVA-EV Building 130": number,
  "UVA-EV Building 131": number,
  "UVA-EV Building 132": number,
  "UVA-EV Building 133": number,
  "UVA-EV Building 134": number,
  "UVA-EV Building 135": number,
  "UVA-EV Building 136": number,
  "UVA-EV Building 139": number,
  "UVA-EV Building 140": number,
  "UVA-EV Building 141": number,
  "UVA-EV Building 143": number,
  "UVA-EV Building 144": number,
  "UVA-WV Building 137": number,
  "UVA-WV Building 138": number,
  "UVA-WV Building 142": number,
  "UVA-WV Building 145": number,
  "UVA-WV Building 146": number,
  "UVA-WV Building 147": number,
  "UVA-WV Building 148": number,
  "UVA-WV Building 149": number,
  "UVA-WV Building 150": number,
  "UVA-WV Building 151": number,
  "UVA-WV Building 152": number,
  "UVA-WV Building 153": number,
  "UVA-WV Building 154": number,
  "UVA-WV Building 155": number,
  "UVA-WV Building 156": number,
  "UVA-WV Building 157": number,
  "UVA-WV Building 158": number,
  "UVA-WV Building 159": number,
  "UVA-WV Building 160": number,
  "UVA-WV Building 161": number,
  "UVA-WV Building 162": number,
  "UVA-WV Building 163": number,
  "UVA-WV Building 164": number,
  "UVA-WV Building 165": number,
  "UVA-WV Building 166": number,
  "UVA-WV Building 167": number,
  "UVA-WV Building 168": number,
  "UVA-WV Building 169": number,
  "UVA-WV Building 170": number,
  "UVA-WV Parking Lot": number,
  "UVA -EV Parking": number,
  "UVA All Buildings": number,
  "UVA All Buildings East Village": number,
  "UVA All Buildings West Village": number,
  "UVA Ground": number,
  "Village Office": number,
  "Wada Hall": number,
  "Walnut St Apartments": number,
  "Wurster Hall": number,
  "xuÄyun ruwway": number,
}

type MapContainerProps = {
  buildingRequestCountsMap: BuildingRequestCountMap
}


const MapContainer = ({ buildingRequestCountsMap }: MapContainerProps ) => {
  const buildingColors: BuildingColors = calcBuildingColors(buildingRequestCountsMap);

  return (
    <div className="flex flex-row flex-nowrap h-full w-full">
      <div className="flex flex-wrap flex-row h-full justify-around">
        <Unit1 buildingColors={buildingColors}/>
        <Unit2 buildingColors={buildingColors}/>
        <Unit3 buildingColors={buildingColors}/>
      </div>
      <div className="flex flex-wrap flex-row flex-grow h-full justify-around">
        <Blackwell buildingColors={buildingColors}/>
        <AnchorHouse buildingColors={buildingColors}/>
        <BeverlyCleary buildingColors={buildingColors}/>
        <Bowles buildingColors={buildingColors}/>
        <ChanningBowditch buildingColors={buildingColors}/>
        <Crossroads buildingColors={buildingColors}/>
        <MartinezCommons buildingColors={buildingColors}/>
      </div>
      <div className="flex fles-row">
        <FoothillStern buildingColors={buildingColors}/>
        <ClarkKerr buildingColors={buildingColors}/>
      </div>
    </div>
  );
}

export default MapContainer;