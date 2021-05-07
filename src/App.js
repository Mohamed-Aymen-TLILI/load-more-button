import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

  const [Items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [HasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadMoreItems();
  }, []);

  function loadMoreItems() {
    setIsFetching(true);

    axios({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/albums",
      params: { _page: page, _limit: 40 },
    })
      .then((res) => {
        setItems((prevTitles) => {
          return [...new Set([...prevTitles, ...res.data.map((b) => b.title)])];
        });
        setPage((prevPageNumber) => prevPageNumber + 1);
        setHasMore(res.data.length > 0);
        setIsFetching(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      {Items.map((item, index) => {
        if (Items.length === index + 1) {
          return (
            <div key={index}>
              {item} - <b>last</b>
            </div>
          );
        } else {
          return <div key={index}>{item}</div>;
        }
      })}
      {isFetching && <p>Fetching items...</p>}
      {!isFetching && HasMore && (
        <button onClick={loadMoreItems}>Load more</button>
      )}
    </div>
  );
};

export default App;
