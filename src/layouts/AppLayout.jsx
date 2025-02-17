import { Grid, GridItem } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
//import { useNavigate } from "react-router-dom";
import Routing from "../routes/Routing";
import React, { useEffect } from "react";
import ScrollToTop from '../components/ScrollToTop'

const AppLayout = () => {
  return (
    <Grid
      templateAreas={`"header"
                  "main"
                  "footer"`}  
      gridTemplateRows={"80px 1fr 50px"} 
      gridTemplateColumns={"1fr"} 
      gap="1"
      fontWeight="bold"
      minHeight="100vh"
    >
      <GridItem area={"header"}>
        <Header />
      </GridItem>

      <GridItem pl="2" bg="green.300" area={"main"}>
        <ScrollToTop />
        <Routing />
      </GridItem>

      <GridItem area={"footer"}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default AppLayout;