import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";
import API from "../api/api";


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import img1 from "../../public/1.jpg";
import img2 from "../../public/2.jpg";
import img3 from "../../public/3.jpg";

import Aboutus from "./Aboutus";


const FALLBACK_IMAGE = new URL("/no-image.png", import.meta.url).href;

const Home = () => {
  const [products, setProducts] = useState([]);


  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
 
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        style={{ width: "100%", height: "480px" }}
      >
        {[img1, img2, img3].map((img, i) => (
          <SwiperSlide key={i}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/*  
      <Box sx={{ py: 8 }}>
        <Aboutus />
      </Box> */}

   
      <Box sx={{ py: 8, backgroundColor: "background.default" }}>
        <Container>
          <Typography variant="h4" fontWeight={700} mb={1}>
            Shop by Category
          </Typography>
          <Typography color="text.secondary" mb={4}>
            Discover products curated just for you
          </Typography>

          {/* Added CSS GRID */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)"
              },
              gap: 4
            }}
          >
            {products.map((product) => (
              <Card
                key={product._id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
                  }
                }}
              >
              
                <Box
                  sx={{
                    height: 200,
                    backgroundColor: "#F9FAFB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <img
                    src={product.image || FALLBACK_IMAGE}
                    alt={product.title || "Product image"}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain"
                    }}
                    onError={(e) => {
                      if (e.currentTarget.src !== FALLBACK_IMAGE) {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }
                    }}
                  />
                </Box>

                {/* Centered text */}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center"
                  }}
                >
                  <Typography fontWeight={600} noWrap>
                    {product.title}
                  </Typography>

                  <Typography color="text.secondary" mb={2}>
                    ₹{product.price}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    component={Link}
                    to={`/product/${product._id}`}
                    sx={{ mt: "auto" }}
                  >
                    View Product
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>


      <Box sx={{ py: 8, backgroundColor: "#F9FAFB" }}>
        <Container>
          <Typography variant="h4" fontWeight={700} mb={1}>
            Featured Products
          </Typography>
          <Typography color="text.secondary" mb={4}>
            Popular picks loved by our customers
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(3, 1fr)"
              },
              gap: 4
            }}
          >
            {products.slice(0, 3).map((product) => (
              <Card
                key={product._id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.06)"
                  }
                }}
              >
              
                <Box
                  sx={{
                    height: 200,
                    backgroundColor: "#F9FAFB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <img
                    src={product.image || FALLBACK_IMAGE}
                    alt={product.title || "Product image"}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain"
                    }}
                    onError={(e) => {
                      if (e.currentTarget.src !== FALLBACK_IMAGE) {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }
                    }}
                  />
                </Box>

            
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography fontWeight={600}>
                    {product.title}
                  </Typography>
                  <Typography color="text.secondary" mb={2}>
                    ₹{product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    component={Link}
                    to={`/product/${product._id}`}
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
