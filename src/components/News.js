import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import articlesJson from './NewsJson.json';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    apiUrl = 'https://newsapi.org/v2/top-headlines';

    static defaultProps = {
        country: 'us',
        pageSize: 3,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }

        document.title = `News - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    async updateNews() {
        // this.setState({ loading: true });

        this.props.setProgress(10);

        const apiUrlWithParams = this.apiUrl +
            `?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        // console.log(apiUrlWithParams);

        let data = await fetch(apiUrlWithParams);

        this.props.setProgress(50);

        let parsedData = await data.json();

        this.props.setProgress(80);

        // console.log(parsedData);

        if (parsedData.status === 'error') {
            parsedData = articlesJson;
        }

        this.setState({
            articles: parsedData.articles,
            // page: pageNo,
            totalResults: parsedData.totalResults,
            // loading: false
        });

        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    handleRefresh = async () => {
        this.updateNews();
    }

    handleFirstClick = async () => {
        this.updateNews();
    }

    handlePreviousClick = () => {
        // this.updateNews(this.state.page - 1);
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = () => {
        // logic for Next button to stop working if no next page is available
        // if (!((this.state.page + 1) > (Math.ceil(this.state.totalResults / this.props.pageSize)))) {
        //     this.updateNews(this.state.page + 1);
        // }
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    handleLastClick = async () => {
        if (!((this.state.page + 1) > (Math.ceil(this.state.totalResults / this.props.pageSize)))) {
            this.updateNews(Math.ceil(this.state.totalResults / this.props.pageSize));
        }
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        // this.updateNews(this.state.page + 1);

        let pageNo = this.state.page;

        let apiUrlWithParams = this.apiUrl +
            `?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pageNo}&pageSize=${this.props.pageSize}`;

        let data = await fetch(apiUrlWithParams);
        let parsedData = await data.json();

        // console.log(parsedData);

        if (parsedData.status === 'error') {
            parsedData = articlesJson;
        }

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            // page: pageNo,
            totalResults: parsedData.totalResults,
        });
    }

    render() {
        return (
            <>
                <div className='container d-flex justify-content-around my-3'>
                    <h2>Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                    <button onClick={this.handleRefresh} className='btn btn-dark' type='button'>Refresh</button>
                </div>
                <InfiniteScroll dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        {/* {this.state.loading && <Spinner />} */}
                        <div className="row">
                            {/* !this.state.loading &&  */}
                            {this.state.articles.map((element) => {
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
                {/* <div className="container d-flex justify-content-around">
                    <button disabled={this.state.page <= 1} type='button' className='btn btn-dark mx-2 my-2'
                        onClick={this.handleFirstClick}>First</button>
                    <button disabled={this.state.page <= 1} type='button' className='btn btn-dark mx-2 my-2'
                        onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <p className='my-3'>Page {this.state.page}</p>
                    <button disabled={((this.state.page + 1) > (Math.ceil(this.state.totalResults / this.props.pageSize)))}
                        type='button' className='btn btn-dark mx-2 my-2'
                        onClick={this.handleNextClick}>Next &rarr;</button>
                    <button disabled={((this.state.page + 1) > (Math.ceil(this.state.totalResults / this.props.pageSize)))}
                        type='button' className='btn btn-dark mx-2 my-2'
                        onClick={this.handleLastClick}>Last</button>
                </div> */}
            </>
        )
    }
}

export default News
