import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://m.media-amazon.com/images/I/71YIDh9SEtL._SX3000_.jpg"
          alt=""
        />

        <div className="home__row">
          <Product
            title="Logitech G502 HERO High Performance Wired Gaming Mouse"
            price={33.98}
            image="https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_UY218_.jpg"
            rating={4}
          />
          <Product
            title="Cosonsen Women's Dress Deep V-Neck Long Sleeve Waist Tie Ruffle Mini Swing Skater Dresses"
            price={37.99}
            image="https://m.media-amazon.com/images/I/51YGdPjQZCL._AC_UL1300_.jpg"
            rating={4}
          />
        </div>

        <div className="home__row">
          <Product
            title="Amazon Basics 48 Pack AA High-Performance Alkaline Batteries, 10-Year Shelf Life"
            price={16.49}
            image="https://m.media-amazon.com/images/I/81ZnAYiX5sL._AC_UL320_.jpg"
            rating={5}
          />
          <Product
            title="DualShock 4 Wireless Controller for PlayStation 4 - Jet Black"
            price={58.5}
            image="https://m.media-amazon.com/images/I/61IG46p-yHL._AC_UL320_.jpg"
            rating={4}
          />
          <Product
            title="Bowflex SelectTech 552 Adjustable Dumbbells"
            price={214.97}
            image="https://m.media-amazon.com/images/I/71+pOdQ7iKL._AC_UL320_.jpg"
            rating={3}
          />
        </div>

        <div className="home__row">
          <Product
            title="CeraVe Moisturizing Cream | Body and Face Moisturizer for Dry Skin | Body Cream with Hyaluronic Acid and Ceramides | Normal | Fragrance Free | 19 Oz | Packages May Vary"
            price={17.78}
            image="https://m.media-amazon.com/images/I/51IH9um3EKL._SX300_SY300_QL70_FMwebp_.jpg"
            rating={3}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
