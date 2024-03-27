import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import articlesJson from './NewsJson.json';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const apiUrl = 'https://newsapi.org/v2/top-headlines';

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const updateNews = async () => {
        setLoading(true);

        props.setProgress(10);

        const apiUrlWithParams = apiUrl +
            `?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        let data = await fetch(apiUrlWithParams);

        props.setProgress(50);

        let parsedData = await data.json();

        props.setProgress(80);

        if (parsedData.status === 'error') {
            parsedData = articlesJson;
        }

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();

        document.title = `News - ${capitalizeFirstLetter(props.category)}`;
        // eslint-disable-next-line
    }, []);

    const handleRefresh = async () => {
        updateNews();
    }

    const fetchMoreData = async () => {

        let apiUrlWithParams = apiUrl +
            `?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;

        setPage(page + 1);

        let data = await fetch(apiUrlWithParams);
        let parsedData = await data.json();

        if (parsedData.status === 'error') {
            parsedData = articlesJson;
        }

        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    }

    return (
        <>
            <div className='container d-flex justify-content-around' style={{ marginTop: '5rem' }}>
                <h2>Top {capitalizeFirstLetter(props.category)} Headlines</h2>
                <button onClick={handleRefresh} className='btn btn-dark' type='button'>Refresh</button>
            </div>
            <InfiniteScroll dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    {/* {loading && <Spinner />} */}
                    <div className="row">
                        {/* !loading &&  */}
                        {articles.map((element) => {
                            return (
                                <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem title={element.title === null ? '' : element.title.slice(0, 45)}
                                        description={element.description === null ? '' : element.description.slice(0, 88)}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        publishedDate={element.publishedAt}
                                        sourceName={element.source.name}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'us',
    pageSize: 3,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;
