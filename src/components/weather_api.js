import React, { useState, useEffect } from "react";

export default function Weather_Api({ location }) {
  const [apiCall, setApiCall] = useState(false);
  const [apiData, setApiData] = useState({ icon: "01d" });

  function convertTime(timezone) {
    var d = new Date();
    var localTime = d.getTime();
    var localOffset = d.getTimezoneOffset() * 60000;
    var utc = localTime + localOffset;
    var locationTime = utc + 1000 * timezone;
    var nd = new Date(locationTime);
    return nd.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  useEffect(() => {
    setApiCall(true);
    if (apiCall === false) {
    } else {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=00a7d9225856a588d48e585ff3a46237`
      )
        .then((response) => response.json())
        .then((weather) => {
          setApiData({
            ...apiData,
            temperature: weather["main"]["temp"],
            timezone: weather["timezone"],
            description: weather["weather"][0]["description"],
            icon: weather["weather"][0]["icon"],
          });
        });
    }
    return () => {
      setApiCall(false); //Clean up
    };
  }, [location]);

  function capitalizeAll(str) {
    return !str
      ? ""
      : str
          .toLowerCase()
          .split(" ")
          .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
          .join(" ");
  }

  return (
    <>
      <div className="Weather-Api-Content-Wrapper">
        <div className="content-header">
          <h1>{location}</h1>
          <h4>{convertTime(apiData.timezone)}</h4>

          <img src={require(`../images/icons/${apiData.icon}.png`).default} />

          <h1>{`${apiData.temperature}°C`}</h1>
          <h2>{capitalizeAll(apiData.description)}</h2>
        </div>
      </div>
    </>
  );
}
