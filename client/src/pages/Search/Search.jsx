import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "@components/layout";
import { InputForm, SearchBrowse, SearchResult } from "@components/search";

function Search() {
  return (
    <Layout>
      <InputForm />
      <Route exact path="/search">
        <SearchBrowse />
      </Route>
      <Route path="/search/studyroom">
        <SearchResult />
      </Route>
    </Layout>
  );
}

export default Search;
