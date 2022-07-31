import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "./Graph.css";
import { Chart as ChartJS } from "chart.js/auto";
import { useParams } from "react-router-dom";
import useInterval from "./utils";
import Skeleton from "@mui/material/Skeleton";
import { useLocation } from "react-router-dom";

function Graph({ post }) {
  const [prize, setprize] = useState([]);
  const [isloading, setisloading] = useState(true);
  const { id } = useParams();
  const [cointime, setcointime] = useState([]);
  const [coinprize, setcoinprize] = useState([]);
  const location = useLocation();
  const { name, fullName } = location.state;

  const fetchPrize = async () => {
    const result = await axios.get("https://jsonkeeper.com/b/DB32");
    setprize(result.data);
    setisloading(false);
    setcoinprize(result.data.slice(0, 10).map((data) => data.price));
    setcointime(
      result.data
        .slice(0, 10)
        .map((data) => data.datetime)
        .map((string) => string.slice(0, -7))
    );
  };

  useEffect(() => {
    fetchPrize();
  }, []);

  const randomNumberGenerator = () => {
    const num = Math.floor(Math.random() * 300 + 1);
    setcoinprize(prize.slice(num, num + 10).map((data) => data.price));

    setcointime(
      prize
        .slice(num, num + 10)
        .map((data) => data.datetime)
        .map((string) => string.slice(0, -7))
    );
  };

  useInterval(randomNumberGenerator, 60000);

  return (
    <div className="grap_conatiner">
      <div className="coin-name">
        <h1 className="name"> {name}</h1>
        <h1 className="name"> {fullName}</h1>
      </div>
      <div className="conatiner graph">
        {isloading ? (
          <Skeleton animation="wave" height="100%" width="100%" />
        ) : (
          <Line
            className="graph"
            data={{
              labels: cointime.map((coin) => {
                return coin;
              }),

              datasets: [
                {
                  data: coinprize,
                  label: `Price in $`,
                  font: {
                    size: 14,
                  },
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Graph;
