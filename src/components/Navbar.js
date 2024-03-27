import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // constructor(props) {
    //     super(props);
    //     this.searchText = { value: '' };

    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //     // this.handleSearch = this.handleSearch.bind(this);
    // }

    // handleChange(event) {
    //     // alert('changed');
    //     this.setState({ value: event.target.value });
    // }

    // handleSubmit(event) {
    //     // alert('submitted: ' + this.state.value);
    //     event.preventDefault();
    // }

    //  onClick={this.handleSearch}
    // handleSearch = () => {
    //     console.log('Search clicked');
    // }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NewsMonkey</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/business">Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/entertainment">Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/health">Health</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/science">Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sports">Sports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/technology">Technology</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Countries
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" key={'in'} to="/India">India</Link></li>
                                    <li><Link className="dropdown-item" key={'us'} to="/US">United States</Link></li>
                                    <li><Link className="dropdown-item" key={'gb'} to="/UK">United Kingdom</Link></li>
                                    <li><Link className="dropdown-item" key={'au'} to="/Australia">Australia</Link></li>
                                    <li><Link className="dropdown-item" key={'jp'} to="/Japan">Japan</Link></li>
                                    <li><Link className="dropdown-item" key={'ru'} to="/Russia">Russia</Link></li>
                                    <li><Link className="dropdown-item" key={'ca'} to="/Canada">Canada</Link></li>
                                    <li><Link className="dropdown-item" key={'cn'} to="/China">China</Link></li>
                                </ul>
                                {/* <form onSubmit={this.handleSubmit} className="d-flex" role="search">
                                        <input value={this.searchText.value} onChange={this.handleChange} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn btn-outline-success" type="submit">Search News</button>
                                    </form> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;