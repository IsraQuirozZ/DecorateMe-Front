import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import CartCard from "./CartCard";
import Load from "../Load";
import "./Cart.css";
import ReturnButton from "../ReturnButton";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  const { user, cart, setCart, getCart, setUser } = useContext(UserContext);

  const [load, setLoad] = useState(true);
  const [total, setTotal] = useState(0);

  const navigation = useNavigate();

  useEffect(() => {
    getCart(user.cid)
      .then((res) => {
        setCart(res.data.response.products);
        let total = res.data.response.totalCart ?? 0;
        setTotal(total.toFixed(2));
      })
      .catch((err) => {
        if (err.response.status === 401) setUser({});
        Swal.fire("Error", err.response.data.error, "error");
      })
      .finally(() => setLoad(false));
  }, []);

  return Object.keys(user).length ? (
    <section className="cartSection" id="cartSection">
      <div className="cartContainer">
        <Box component="header">
          <ReturnButton />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{
                color: "black",
                borderColor: "black",
                ":hover": {
                  color: "black",
                  borderColor: "black",
                  backgroundColor: "#f2f2f2",
                },
              }}
              variant="outlined"
            >
              Clear
            </Button>
          </Box>
        </Box>
        {load ? (
          <Load />
        ) : cart.length ? (
          <Box component="article">
            <div className="cartContainer__sections">
              <h3 className="cartContainer__section productSection">Product</h3>
              <h3 className="cartContainer__section unitsSection">Units</h3>
              <h3 className="cartContainer__section productSection">Price</h3>
            </div>
            <div className="cartList">
              {load ? (
                <Load />
              ) : cart.length ? (
                cart.map((product) => (
                  <CartCard key={product.id} product={product} />
                ))
              ) : (
                <Typography>No products</Typography>
              )}
            </div>
          </Box>
        ) : (
          <Typography>No products</Typography>
        )}

        <div className="cartContainer__bottom">
          <h2 className="totalProducts">Products: {cart.length}</h2>
          <h2 className="totalPrice">Total: {total} €</h2>
          <Button
            variant="contained"
            sx={{
              color: "black",
              backgroundColor: "wheat",
              ":hover": {
                color: "white",
                backgroundColor: "black",
              },
            }}
          >
            Pay
          </Button>
        </div>
      </div>
    </section>
  ) : (
    navigation("/login")
  );
};

export default Cart;
