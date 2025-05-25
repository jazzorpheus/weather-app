// Props Validation
import PropTypes from "prop-types";

// Local Components
import Thermometer from "./Thermometer.jsx";

// Icons
import { TiLocationArrow } from "react-icons/ti";

export default function CurrentWeatherStat({ stat }) {
  let graph;
  const pieBaseStyles = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    justifystatLabel: "center",
    alignItems: "center",
  };
  if (stat.name === "Temperature" || stat.name === "Feels like") {
    graph = <Thermometer temp={stat.value} />;
  }
  if (stat.name === "Cloud cover") {
    const pieStyles = {
      ...pieBaseStyles,
      background: `conic-gradient(DimGray calc(${stat.value} * 1%), SkyBlue 0)`,
    };
    graph = <div style={pieStyles}></div>;
  }
  if (stat.name === "Humidity") {
    const pieStyles = {
      ...pieBaseStyles,
      background: `conic-gradient(DarkBlue calc(${stat.value} * 1%), transparent 0)`,
    };
    graph = <div style={pieStyles}></div>;
  }
  const arrowBaseStyles = {
    position: "relative",
    width: "100px",
    height: "2px",
    backgroundColor: "white",
  };
  if (stat.name === "Wind speed") {
    let arrowHeads = [];
    for (let i = 0; i < stat.intensityIdxSpeed; i++) {
      arrowHeads.push(
        <div
          style={{
            content: "",
            position: "absolute",
            top: "-4px",
            right: `${i * 10 - 4}px`,
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
            right: `${i * 10 - 4}px`,
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
  let windDirIcon;
  if (stat.name === "Wind direction") {
    // TODO
    windDirIcon = <TiLocationArrow className={stat.styles} />;
    graph = <TiLocationArrow className={stat.styles} style={{ scale: "3" }} />;
  }
  const scaleBaseStyles = {
    position: "relative",
    width: "100px",
    height: "8px",
    borderBottom: "solid white 2px",
    borderLeft: "solid white 2px",
    borderRight: "solid white 2px",
  };
  if (stat.name === "Visibility") {
    graph = (
      <div style={scaleBaseStyles}>
        <span
          style={{
            position: "absolute",
            fontSize: "0.7rem",
            left: "-4px",
            top: "5px",
          }}
        >
          0
        </span>
        <div
          style={{
            position: "absolute",
            content: "",
            width: "2px",
            borderBottom: "solid gold 9px",
            left:
              stat.value === 0
                ? `${-2}%`
                : `${stat.value * 10 - 1 / Math.ceil(stat.value)}%`,
            bottom: "0",
          }}
        ></div>
        <span
          style={{
            position: "absolute",
            fontSize: "0.7rem",
            left: "90px",
            top: "5px",
          }}
        >
          10
        </span>
      </div>
    );
  }

  let statLabel;
  if (stat.name === "Wind direction") {
    statLabel = (
      <p className="relative top-[20%] text-center">
        {stat.name}: {windDirIcon}
        {stat.value}
      </p>
    );
  } else {
    statLabel = (
      <p className="relative top-[15%] text-center">
        {stat.name}: {stat.value}
        {stat.units}
      </p>
    );
  }

  return (
    <figure className="weather-stat text-sm flex flex-col justify-center items-center bg-[rgba(23,37,84,0.4)] rounded-xl m-1">
      {graph}
      {statLabel}
    </figure>
  );
}

// Props Validation
CurrentWeatherStat.propTypes = {
  stat: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    units: PropTypes.string,
    intensityIdxSpeed: PropTypes.number,
    intensityIdxGust: PropTypes.number,
    styles: PropTypes.string,
  }).isRequired,
};
