import "./App.css";
import { useState, useEffect } from "react";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import AboutView from "./components/AboutView";
import ReviewsPage from "./components/ReviewsPage";
import SearchView from "./components/SearchView";
import { Route, Switch } from "react-router-dom";
import "./styles/main.scss";
import Footer from "./components/Footer";
import solidIcons from "./components/Icons";
import ContactView from "./components/Contact";

solidIcons();

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // console.log(searchText, "is the search text");
    fetch(`https://api.tvmaze.com/search/shows?q=:${searchText}`)
      .then((response) => {
        // console.log("blH", response.json());
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSearchResults(data);
      });
  }, [searchText]);

  return (
    <div>
      <NavBar searchText={searchText} setSearchText={setSearchText} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={AboutView} />
        <Route path="/reviews" component={ReviewsPage} />
        <Route path="/search">
          <SearchView keyword={searchText} searchResults={searchResults} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
