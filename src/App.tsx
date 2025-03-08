import "./App.css";
import { useEffect, useState } from "react";

import Searchbar from "./components/Searchbar/Searchbar";
import ResultList from "./components/ResultList/ResultList";
import useSearchContacts from "./hook/useSearchContacts";

import type { Comment } from "./types";

function App() {
  const [query, setQuery] = useState<string>("");

  const { data, refetch } = useSearchContacts<Comment[]>(query, {
    enabled: true,
    key: "home",
  });

  useEffect(() => {
    if (query.length === 0) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <main className="jp-main">
      <h1>Json Placeholder test</h1>
      <Searchbar
        value={query}
        handleSearch={setQuery}
        onSumbit={refetch}
        onClear={() => setQuery("")}
      />
      <ResultList data={data} />
    </main>
  );
}

export default App;
