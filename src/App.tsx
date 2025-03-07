import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import AppButton from "./components/UI/AppButton/AppButton";
import Card from "./components/UI/Card/Card";

const queryClient = new QueryClient();

function App() {
  const handleClick = () => {
    console.log("Button clicked!");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>TEST</h1>
        <AppButton text="test button" onClick={handleClick}/>
        <Card />
      </div>
    </QueryClientProvider>
  );
}

export default App;
