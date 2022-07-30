import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import "./Coinlist.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

function Coinlist() {
  const [activeTab, setActiveTab] = useState();
  const [poststag, setpoststag] = useState([]);
  const [page, setpage] = useState(1);
  const [isloading, setisloading] = useState(true);

  const navigate = useNavigate();

  const parseData = (data) => {
    const tagWiselist = {};
    tagWiselist.all = data;

    data.map((post) => {
      const tags = post.tags;
      tags.map((tag) => {
        if (!tagWiselist[tag]) {
          tagWiselist[tag] = [];
        }
        tagWiselist[tag].push(post);
      });
    });
    return tagWiselist;
  };

  useEffect(() => {
    const fetchposts = async () => {
      const result = await axios.get("https://jsonkeeper.com/b/VE7I");
      const postsResult = parseData(result.data);
      setisloading(false);
      // settags(result.data.map((data) => data.tags));
      setpoststag(postsResult);
      setActiveTab("all");
    };
    fetchposts();
  }, []);
  //console.log(poststag.all)
  function handleClick(id) {
    navigate("/coin/" + id);
  }
  // let test = tags.map(data =>{
  //   return data.filter((item, i, ar) => ar.indexOf(item) === i)
  // })
  // let taglist = poststag;

  // let taglist = tags.flat(1).filter((item, i, ar) => ar.indexOf(item) === i);

  function handleTag(tagId) {
    // console.log(poststag[tagId], tagId);
    setActiveTab(tagId);
    // setposts(poststag[tagId])
  }
  return (
    <div className="conatiner">
      <div className="tag_container">
        <ul className="tag">
          {Object.keys(poststag).map((data, index) => (
            <li
              key={index}
              className={data === activeTab ? 'active tag_list' : 'tag_list'}
              onClick={() => handleTag(data)}
            >
              {" "}
              {data}{" "}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {isloading === true ? (
          <div>
            <LinearProgress />
          </div>
        ) : (
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col ">Full Name</th>
                <th scope="col ">Current Prize</th>
                <th scope="col ">Day Change</th>
              </tr>
            </thead>

            <tbody>
              {poststag[activeTab]
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((post, index) => (
                  <tr key={index} onClick={() => handleClick(post.id)}>
                    {post.name}

                    <th scope="row">{post.fullName}</th>
                    <td link to="/coin">
                      {post.price}
                    </td>
                    <td>{post.dayChange}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination
        count={(poststag[activeTab]?.length / 10).toFixed(0)}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(_, value) => {
          setpage(value);
          window.scroll(0, 450);
        }}
      />
    </div>
  );
}

export default Coinlist;
