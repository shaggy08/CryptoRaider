import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={"/"}>
          <p class="navbar-brand">Crypto Raider</p>
        </Link>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto"></ul>

          {/* <input class=" mr-sm-2" type="text" placeholder="Enter name" onClick={(event)=> handlesearch(event.target.value)}  id="text-form" /> */}
          {/* <button class="btn btn-outline-success my-2 my-sm-0">Search</button> */}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
