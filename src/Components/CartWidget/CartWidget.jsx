import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartWidget = () => {
  const [quantityProducts, setQuantityProducts] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/cart/648a0049c5392c5c08014dc6`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setQuantityProducts(res.data.response.products.length);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link to="/cart">
      <Badge badgeContent={quantityProducts} color="success">
        <ShoppingCart fontSize="large" sx={{ color: '#fff' }} />
      </Badge>
    </Link>
  );
};

export default CartWidget;
