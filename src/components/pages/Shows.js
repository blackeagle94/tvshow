import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSHOWS } from '../../redux/shows/showActions';
import { fetchSeasons } from '../../redux/seasons/seasonsActions';
import { fetchSEARCH } from '../../redux/serach/searchActions';

class Shows extends Component {
	componentDidMount() {
		let show = [ 169, 82, 123, 335, 491, 3928, 83, 527, 73, 179, 430, 22 ];
		for (let i = 0; i < show.length; i++) {
			this.props.fetchSHOWS(`http://api.tvmaze.com/shows/${show[i]}`);
		}
	}

	componentWillUnmount() {
		this.props.fetchSHOWS(``);
	}

	onClick = () => {
		let input = document.getElementById('input').value
		this.props.fetchSEARCH(`http://api.tvmaze.com/search/shows?q=${input}`);
	};
	render() {
		return (
			<div>
				<div className="d-flex justify-content-center">
					<input style={{width:'30%'}} id="input" className="input-group" type="text" placeholder="Search your favorite show..." />
					<Link to="/tvshow/search"><button onClick={this.onClick} className="btn btn-dark ms-2">Search</button></Link>
				</div>
				<div className="row row-cols-1 row-cols-md-6 g-4">
					{this.props.shows.map((film) => {
						const summary = film.summary
							? film.summary.replace('<p>', '').replace('</p>', '').split(' ').length >= 30
								? film.summary.replace('<p>', '').replace('</p>', '').split(' ').slice(0, 30).join(' ') +
									'...'
								: film.summary.replace('<p>', '').replace('</p>', '')
							: 'No summary';
						return (
							<div key={film.id} className="col mt-2">
								<div className="card">
									<img src={film.image ? film.image.medium : 'https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-300x245.jpg'} className="card-img-top" alt="..." />
									<div className="card-body desciptions">
										<h3 className="card-title">{film.name}</h3>
										<p>
											<p className="card-text">
												Rating: <span>{film.rating.average}</span>
											</p>
											<p className="card-text">
												Language: <span>{film.language}</span>
											</p>
											<p className="card-text">
												Types:{' '}
												<span>
													{film.genres[0]} {film.genres[1]}
												</span>
											</p>
											<Link
												onClick={() =>
													this.props.fetchSeasons(
														`http://api.tvmaze.com/shows/${film.id}/seasons`
													)}
												to="/tvshow/seasons"
											>
												<button type="button" className="btn btn-info">
													Show more
												</button>
											</Link>
											<div className="card-footer mt-2">
												<small className="text-muted">
													Status: <span>{film.status}</span>
												</small>
											</div>
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		shows: state.shows.data
	};
};

const mapDiapatchToProps = (dispatch) => {
	return {
		fetchSHOWS: (id) => dispatch(fetchSHOWS(id)),
		fetchSeasons: (id) => dispatch(fetchSeasons(id)),
		fetchSEARCH: (id) => dispatch(fetchSEARCH(id))
	};
};

export default connect(mapStateToProps, mapDiapatchToProps)(Shows);

{
	/* <img src={film.image ? film.image.medium : ''} className="card-img-top" alt="..." />
							<div className="card-body desciptions">
								<h1 className="card-title">{film.name}</h1>
								<p>
                                <p className="card-text">
									Rating: <span>{film.rating.average}</span>
								</p>
								<p className="card-text">
									Language: <span>{film.language}</span>
								</p>
								<p className="card-text">
									Types:{' '}
									<span>
										{film.genres[0]} {film.genres[1]}
									</span>
								</p>
								<Link to="/seasons"><button type="button" className="btn btn-dark">
									Show more
								</button></Link>
								<div className="card-footer mt-2">
									<small className="text-muted">Status: <span>{film.status}</span></small>
								</div>
                                </p>
							</div> */
}
