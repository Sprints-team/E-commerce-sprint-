import { MantineProvider, Container } from "@mantine/core";

import Header from "./components/Header";
import Navbar from "./components/Navbar";

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
        <Container size="xl">
          <Navbar />
        </Container>
      </Header>
    </MantineProvider>
  );
}

export default App;
