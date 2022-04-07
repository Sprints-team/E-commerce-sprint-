import { MantineProvider, Container } from "@mantine/core";
import Cover from "./components/Header/Cover";

import Header from "./components/Header/Header";
import Navbar from "./components/Header/Navbar";
import ProductsList from "./components/productslist/ProductsList";

import data from "./data.json";

function App() {
  return (
    <MantineProvider
      theme={{
        colors: {
          "orange-red": [
            "#FFF3F3",
            "#FFDBDB",
            "#FFC4C4",
            "#FFAFAF",
            "#FF9B9B",
            "#FF8787",
            "#FF7373",
            "#FF6161",
            "#FF4F4F",
            "#FF3F3F",
            "#FF2F2F",
            "#FF2020",
          ],
        },
      }}
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
      <ProductsList products={data} />
    </MantineProvider>
  );
}

export default App;
