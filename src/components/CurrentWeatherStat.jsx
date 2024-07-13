// My Components
import Thermometer from "./Thermometer.jsx";

// Icons
import { TiLocationArrow } from "react-icons/ti";

export default function CurrentWeatherStat({ stat }) {
  let graph;
  if (stat.name === "Temperature" || stat.name === "Feels like") {
    graph = <Thermometer temp={stat.value} />;
    // graph = <ThermometerChart temp={stat.value} />;
  } else {
    graph = <p>&lt;*Graph goes here!*&gt;</p>;
  }

  // .pie-chart-clouds {
  //   width: 40px;
  //   height: 40px;
  // border-radius: 50%;
  // background: conic-gradient(DimGray calc(56 * 1%), PaleTurquoise 0);
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // }

  if (stat.name === "Cloud cover") {
    const styles = {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: `conic-gradient(DimGray calc(${stat.value} * 1%), PaleTurquoise 0)`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
    graph = <div style={styles}></div>;
  }
  if (stat.name === "Humidity") {
    const styles = {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: `conic-gradient(PaleTurquoise calc(${stat.value} * 1%), DimGray 0)`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
    graph = <div style={styles}></div>;
  }

  let content;
  if (stat.name === "Wind direction") {
    content = (
      <p className="relative top-[20%] text-center">
        {stat.name}: <TiLocationArrow className={stat.styles} />
        {stat.value}
      </p>
    );
  } else {
    content = (
      <>
        <p className="relative top-[15%] text-center">
          {stat.name}: {stat.value}
          {stat.units}
        </p>
      </>
    );
  }

  return (
    <figure className="weather-stat text-sm flex flex-col justify-center items-center bg-[rgba(23,37,84,0.4)] rounded-xl m-1">
      {graph}
      {content}
    </figure>
  );
}
