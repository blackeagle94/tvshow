import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSHOWS } from '../../redux/shows/showActions';
import { fetchSeasons } from '../../redux/seasons/seasonsActions';
import { fetchSEARCH } from '../../redux/serach/searchActions';

class Shows extends Component {


	onClick = () => {
		let input = document.getElementById('input').value
		this.props.fetchSEARCH(`http://api.tvmaze.com/search/shows?q=${input}`);
	};
	render() {
		return (
			<div>
				<div className="d-flex justify-content-center">
                    <div className="col"><Link to="/"><button className="btn btn-info">Home Page</button></Link></div>
					<div className="d-flex col"><input id="input" className="input-group" type="text" placeholder="Search your favorite show..."/>
					<button onClick={this.onClick} className="btn btn-secondary">Search</button></div>
				</div>
				<div className="row row-cols-1 row-cols-md-4 g-4">
					{this.props.search.map((film) => {
						
						return (
							<div key={film.show.id} className="col mt-2">
								<div className="card">
									<img src={film.show.image ? film.show.image.medium : 'https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-300x245.jpg'} className="card-img-top" alt="..." />
									<div className="card-body desciptions">
										<h3 className="card-title">{film.show.name}</h3>
										<p>
											<p className="card-text">
												Rating: <span>{film.show.rating.average}</span>
											</p>
											<p className="card-text">
												Language: <span>{film.show.language}</span>
											</p>
											<p className="card-text">
												Types:{' '}
												<span>
													{film.show.genres[0]} {film.show.genres[1]}
												</span>
											</p>
											<Link id={film.show.id} className="btn btn-dark"
												onClick={() =>
													this.props.fetchSeasons(
														`http://api.tvmaze.com/shows/${film.show.id}/seasons`
													)}
												to="/seasons"
											>
												
													Show more
										
											</Link>
											<div className="card-footer mt-2">
												<small className="text-muted">
													Status: <span>{film.show.status}</span>
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
		search: state.searches.data
	};
};

const mapDiapatchToProps = (dispatch) => {
	return {
		fetchSEARCH: (id) => dispatch(fetchSEARCH(id)),
		fetchSeasons: (id) => dispatch(fetchSeasons(id))
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
