import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ cart, user }, dispatch] = useStateValue();

  const handleAuthentification = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <>
      <div className="header">
        <Link to="/">
          <img
            className="header__logo"
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          />
        </Link>

        <div className="header__search">
          <input className="header__searchInput" type="text" />
          <SearchIcon className="header__searchIcon" />
        </div>

        <div className="header__nav">
          <div className="header__option">
            <div className="language">
              <span className="header__optionLineTwo header__language">EN</span>
              <span className="header__optionLineTwo header__arrow">
                <ArrowDropDownOutlinedIcon />{" "}
              </span>
            </div>
          </div>
        </div>

        <Link to={!user && "/login"}>
          <div onClick={handleAuthentification} className="header__option">
            <span className="header__optionLineOne">
              Hello, {!user ? "Guest" : user.email}
              {user ? " Sign out" : " Sign in"}
            </span>
            <span className="header__optionLineTwo">
              <span className="header__optionLineTwo header__dropDown">
                <span className="header__optionLineTwo header__account">
                  Accounts & Lists
                </span>
                <ArrowDropDownOutlinedIcon />{" "}
              </span>
            </span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingCartOutlinedIcon />
            <span className="header__optionLineTwo header__basketCount">
              {cart?.length}
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Header;

// ?:Optionnal chainning, due to any reason u dont have the correct value or undefined, it wont freak out
// {user ? "Sign Out" : "Sign In"} if the user is signed in then Sign him out otherwise Sign in
// {!user ? "Guest" : user.email} if there's no user then use Guest if there's use user.email
//{!user && "/login"} if no user then we push to the login page. If we only sign out it won't push to the login page, only if we
//want to sign in.
