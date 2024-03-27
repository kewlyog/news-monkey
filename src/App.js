import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {

  //apiKey = '8822590b5ddc4049a6e939990db0962d'; // kewlaron1@gmail.com
  apiKey = process.env.REACT_APP_NEWS_API; // '58395f77bf3449b38cb53d9f729c7d3a'; // kewlarav@gmail.com

  pageSize = 6;
  country = 'in';

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress });
    console.log(this.apiKey);
  }

  render() {
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route exact path='/'
              element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='general' pageSize={this.pageSize} country={this.country} category='general' />}
            />
            <Route exact path='/business'
              element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='business' pageSize={this.pageSize} country={this.country} category='business' />}
            />
            <Route exact path='/entertainment'
              element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='entertainment' pageSize={this.pageSize} country={this.country} category='entertainment' />}
            />
            <Route exact path='/health'
              element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='health' pageSize={this.pageSize} country={this.country} category='health' />}
            />
            <Route exact path='/science'
              element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='science' pageSize={this.pageSize} country={this.country} category='science' />}
            />
            <Route exact path='/sports'
              element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='sports' pageSize={this.pageSize} country={this.country} category='sports' />}
            />
            <Route exact path='/technology'
              element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='technology' pageSize={this.pageSize} country={this.country} category='technology' />}
            />
          </Routes>
        </Router>
      </>
    )
  }
}
