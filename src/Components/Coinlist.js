import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import "./Coinlist.css";
import { useNavigate } from "react-router-dom";
import e from "cors";
import { CircularProgress } from "@mui/material";

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
      const result = await axios.get("https://supermind-staging.vercel.app/api/test/listing");
      const postsResult = parseData(result.data);
      setisloading(false);

      setpoststag(postsResult);
      setActiveTab("all");
    };
    fetchposts();
  }, []);

  function handleClick(post) {
    const { id, name, fullName } = post;

    navigate("/coin/" + id, { state: { name: name, fullName: fullName } });
  }

  function handleTag(tagId) {
    setActiveTab(tagId);
  }

  return (
    <div className="conatiner coin-list-container">
      {isloading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="tag_container ">
            <ul class="list-group list-group-horizontal">
              {Object.keys(poststag).map((data, index) => (
                <li
                  key={index}
                  className={
                    data === activeTab
                      ? "active tag_list list-group-item"
                      : "tag_list list-group-item"
                  }
                  onClick={() => handleTag(data)}
                >
                  {data}
                </li>
              ))}
            </ul>
          </div>
          <table class="table">
            <thead>
              <tr className="trow">
                <th scope="col" className="tcol">
                  Name
                </th>
                <th scope="col " className="tcol">
                  Full Name
                </th>
                <th scope="col " className="tcol">
                  Current Prize in $
                </th>
                <th scope="col " className="tcol">
                  Day's Change in $
                </th>
              </tr>
            </thead>

            <tbody>
              {poststag[activeTab]
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((post, index) => (
                  <tr
                    key={index}
                    onClick={() => handleClick(post)}
                    className="trow"
                  >
                    <td> {post.name}</td>
                    <th scope="row" className="tcol">
                      {post.fullName}
                    </th>
                    <td className="tcol">{post.price}</td>
                    <td className="tcol">{post.dayChange}</td>
                  </tr>
                ))}
            </tbody>
          </table>
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
        </>
      )}
    </div>
  );
}

export default Coinlist;
