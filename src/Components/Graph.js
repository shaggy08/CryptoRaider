import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "./Graph.css";
import { Chart as ChartJS } from "chart.js/auto";
import { useParams } from "react-router-dom";
import useInterval from "./utils";
import LinearProgress from "@mui/material/LinearProgress";

function Graph({ post }) {
  const [prize, setprize] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [isloadingpost, setisloadingpost] = useState(true);
  const { id } = useParams();
  const [posts, setposts] = useState([]);
  const [cointime, setcointime] = useState([]);
  const [coinprize, setcoinprize] = useState([]);
  const [CoinName, setCoinName] = useState();

  const fetchposts = async () => {
    const result = await axios.get("https://jsonkeeper.com/b/VE7I");
    setposts(result.data);
    setisloadingpost(false);
    const tempCoinName = result.data.filter((data) => data.id === +id);
    setCoinName(tempCoinName);
  };
  console.log(coinprize);

  console.log(CoinName);
  const fetchPrize = async () => {
    const result = await axios.get("https://jsonkeeper.com/b/DB32");
    setprize(result.data);
    setisloading(false);
    setcoinprize(result.data.slice(0, 10).map((data) => data.price));
    setcointime(result.data.slice(0, 10).map((data) => data.datetime));
  };

  useEffect(() => {
    fetchPrize();
    fetchposts();
    // settop(prize.slice(1,20));
  }, []);

  let coinprizearr = prize.map((data) => data.price);
  let cointimearr = prize.map((data) => data.datetime);

  const randomNumberGenerator = () => {
    const num = Math.floor(Math.random() * 300 + 1);
    setcoinprize(prize.slice(num, num + 10).map((data) => data.price));
    setcointime(prize.slice(num, num + 10).map((data) => data.datetime));
    console.log(num);
    console.log(coinprize);
    console.log(cointime);
  };

  useInterval(randomNumberGenerator, 60000);

  return (
    <div className="grap_conatiner">
      <div className="coin_name">
        {isloadingpost === true ? (
          <div>
            <LinearProgress />
          </div>
        ) : (
          <div className="name_conatiner">
            {/* { setCoinName(posts.filter( data => data.id === id)) } */}
            <h1 className="name"> {CoinName[0].id}</h1>
            <h1 className="name"> {CoinName[0].name}</h1>
            <h1 className="name"> {CoinName[0].fullName}</h1>
          </div>
        )}
      </div>

      {isloading === true ? (
        <div>
          <h1> loading</h1>

          {/* <Box sx={{ width: '100%' }}> */}
          <LinearProgress />
          {/* </Box> */}
        </div>
      ) : (
        <Line
          data={{
            labels: cointime.map((coin) => {
              return coin;
            }),

            datasets: [
              {
                // data:  prize.map( (data)=>data.datetime),
                data: coinprize,

                label: `Prize `,
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
  );
}

export default Graph;
