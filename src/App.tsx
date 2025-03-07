import "./App.css";
import { useState } from "react";

import Searchbar from "./components/Searchbar/Searchbar";
import ResultList from "./components/ResultList/ResultList";
import useSearchContacts from "./hook/useSearchContact";

import { Contact } from "./types";

function App() {
  const [query, setQuery] = useState<string>("");

  const { data, refetch } = useSearchContacts<Contact[]>(query);

  const handleSearchSubmit = async () => {
    refetch();

    console.log(data);
  };

  return (
    <main>
      <h1>Json Placeholder test</h1>
      <Searchbar
        value={query}
        handleSearch={setQuery}
        onSumbit={() => {
          handleSearchSubmit();
        }}
      />
      <ResultList data={data} />
    </main>
  );
}

export default App;
