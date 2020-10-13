import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Link className="item" to="/1">
        Level 1
      </Link>
      <Link className="item" to="/2">
        Level 2
      </Link>
      <Link className="item" to="/3">
        Level 3
      </Link>
      <Link className="item" to="/4">
        Level 4
      </Link>
    </div>
  );
}

export default Home;
