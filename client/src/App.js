import { MantineProvider, Container } from "@mantine/core";
import Cover from "./components/Header/Cover";
import Header from "./components/Header/Header";
import Navbar from "./components/Header/Navbar";
import Sections from "./components/Sections/Sections";
import ProductsList from "./components/productslist/ProductsList";

import data from "./data.json";

function App() {
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
        <Container size="lg">
          <Navbar />
        </Container>
        <Container size="xl">
          <Cover />
        </Container>
      </Header>
      <Container size="lg">
        <Sections />
      </Container>
      <ProductsList products={data} />
    </MantineProvider>
  );
}

export default App;
