import React from 'react';

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, publishedDate, sourceName } = props;
    return (
        <div className='my-3'>
            <div className="card">
                <div className='d-flex position-absolute' style={{ right: 0 }}>
                    <span className="badge text-bg-danger">
                        {sourceName}
                    </span>
                </div>
                <img src={imageUrl ? imageUrl
                    : 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202403/milky-way-galaxy-213536602-16x9_0.jpg?VersionId=a2U4NbDKRy2voIJw4IwHtgsNVyBIOBjH'
                } className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className='card-text'>
                        <small className='text-muted'>
                            By {author ? author : 'Unknown'} on {new Date(publishedDate).toDateString()}
                        </small>
                    </p>
                    <p className="card-text">{description}...</p>
                    <a href={newsUrl} target='_blank' rel='noreferrer'
                        className="btn btn-sm btn-primary">Read More..</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem;
