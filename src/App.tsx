import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Card from "./components/UI/Card/Card";
import { Searchbar } from "./components/Searchbar/Searchbar";
import apiCall from "./utils/apiCall";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    apiCall("comments", {
      query: {
        q: query,
      },
      onSuccess: (res) => {
        setData(res);
      },
    });
  }, [query]);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>TEST</h1>
        <Searchbar handleSearch={setQuery} />
        <Card />
        {(data as any[]).map((item, idx) => (
          <p key={idx}>{item.name}</p>
        ))}
      </div>
    </QueryClientProvider>
  );
}

export default App;
