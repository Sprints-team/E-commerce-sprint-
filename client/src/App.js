import { MantineProvider, Container } from "@mantine/core";
import data from './data.json'
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ProductsList from "./components/productslist/ProductsList";
import { useState } from 'react';

function App() {
const[products,setProducts]=useState(data)
  return (
    <MantineProvider
      defaultProps={{
        Container: {
          sizes: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
          },
        },
      }}
    >
      <Header>
        <Container size="xl">
          <Navbar />
        </Container>
      </Header>
      <ProductsList products={products}/>
    </MantineProvider>
  );
}

export default App;
