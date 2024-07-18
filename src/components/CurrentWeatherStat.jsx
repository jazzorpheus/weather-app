// My Components
import Thermometer from "./Thermometer.jsx";

// Icons
import { TiLocationArrow } from "react-icons/ti";

export default function CurrentWeatherStat({ stat }) {
  let graph;
  let pieBaseStyles = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    justifystatLabel: "center",
    alignItems: "center",
  };

  let arrowBaseStyles = {
    position: "relative",
    width: "100px",
    height: "2px",
    backgroundColor: "white",
  };

  if (stat.name === "Temperature" || stat.name === "Feels like") {
    graph = <Thermometer temp={stat.value} />;
  } else {
    // ! DEV ONLY
    graph = <p>&lt;*Graph goes here!*&gt;</p>;
  }
  if (stat.name === "Cloud cover") {
    const pieStyles = {
      ...pieBaseStyles,
      background: `conic-gradient(DimGray calc(${stat.value} * 1%), PaleTurquoise 0)`,
    };
    graph = <div style={pieStyles}></div>;
  }
  if (stat.name === "Humidity") {
    const pieStyles = {
      ...pieBaseStyles,
      background: `conic-gradient(PaleTurquoise calc(${stat.value} * 1%), DimGray 0)`,
    };
    graph = <div style={pieStyles}></div>;
  }
  if (stat.name === "Wind speed") {
    let arrowHeads = [];
    for (let i = 0; i < stat.intensityIdxSpeed; i++) {
      arrowHeads.push(
        <div
          style={{
            content: "",
            position: "absolute",
            top: "-4px",
            right: `${i * 10}px`,
            width: "0",
            height: "0",
            borderLeft: "10px solid white",
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
          }}
          key={i}
        />
      );
    }
    let arrowHeadsContainer = <div>{arrowHeads}</div>;
    graph = <div style={arrowBaseStyles}>{arrowHeadsContainer}</div>;
  }
  if (stat.name === "Wind gust") {
    let arrowHeads = [];
    for (let i = 0; i < stat.intensityIdxGust; i++) {
      arrowHeads.push(
        <div
          style={{
            content: "",
            position: "absolute",
            top: "-4px",
            right: `${i * 10}px`,
            width: "0",
            height: "0",
            borderLeft: "10px solid white",
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
          }}
          key={i}
        />
      );
    }
    let arrowHeadsContainer = <div>{arrowHeads}</div>;
    graph = <div style={arrowBaseStyles}>{arrowHeadsContainer}</div>;
  }

  let statLabel;
  if (stat.name === "Wind direction") {
    statLabel = (
      <p className="relative top-[20%] text-center">
        {stat.name}: <TiLocationArrow className={stat.styles} />
        {stat.value}
      </p>
    );
  } else {
    statLabel = (
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
      {statLabel}
    </figure>
  );
}
