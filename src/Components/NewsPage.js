import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

export default function NewsPage({ country = "in", category = "general", setProgress }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchApi = useCallback(async () => {
    setLoading(true);
    setProgress(0);
    const apiKey = "61f1559e95bb48e68adec44d56f70f98";
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=10`;
    setProgress(20);
    try {
      const response = await fetch(url);
      setProgress(50);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProgress(70);
      console.log(data);
      setArticles(data.articles);
      setTotalResults(data.totalResults); // Assuming the API returns an array of articles under 'articles'
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      // Handle error: set loading state or display error message
      setLoading(false);
    }
  }, [country, category, page, setProgress]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const fetchMoreData = async () => {
    try {
      setPage((prevPage) => prevPage + 1);
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=61f1559e95bb48e68adec44d56f70f98&page=${page}&pageSize=10`;
      const data = await fetch(url);
      const parsedData = await data.json();
      setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching more news:", error);
      // Handle error: set loading state or display error message
    }
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />
      <section className="pt-15 lg:pt-[20px] pb-10 lg:pb-20">
        <div className='flex flex-col justify-center items-center'>
          <h2 className='mt-20 text-3xl'>Top {category} Headlines</h2>
          {loading && <Spinner />}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length < totalResults}
            loader={<Spinner />}
          >
            {/* Cards Section */}
            <div className="container pt-5">
              <div className="flex flex-wrap justify-center -mx-4">
                {/* Map over articles to display each article */}
                {articles.map((article) => (
                  <div key={article.url} className="w-full md:w-96 xl:w-96 px-4">
                    <div className="bg-white rounded-lg overflow-hidden mb-10">
                      <img
                        style={{ height: "250px" }}
                        src={article.urlToImage === null ? "https://cdn.wionews.com/sites/default/files/2024/07/06/442008-northern-lights.png" : article.urlToImage}
                        alt={article.title}
                        className="w-full"
                      />
                      <div className="p-8 sm:p-9 md:p-7 xl:p-9 bg-red-900">
                        <h3>
                          <a
                            href={article.url}
                            className="font-semibold text-white text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 block hover:text-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {article.title.slice(0, 60)}
                          </a>
                        </h3>
                        <p className="text-xs text-white leading-relaxed mb-7">
                          {article.description === null ? "Lorem ipsum dolor sit amet consectetur adipisicing elit." : article.description.slice(0, 88)}
                        </p>
                        <a
                          href={article.url}
                          className="inline-block py-2 px-7 border border-white rounded-full text-white font-bold hover:border-white hover:bg-white hover:text-black transition"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </section>
    </>
  );
}
