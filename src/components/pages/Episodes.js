import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Episodes(props) {
    console.log(props.episodes)
	return (
		<div>
			<div className="d-flex justify-content-around">
			<Link to="/"><button className="btn btn-light">Home Page</button></Link>
				<Link to="/seasons"><button className="btn btn-light">Go Back to Seasons</button></Link>
			</div>
			<div class="row row-cols-1 row-cols-md-3 g-4">
				{props.episodes ? props.episodes.map((film) => {
                    const summary = film.summary ?  film.summary.replace('<p>', '').replace('</p>', '').split(' ').length >= 30 ? film.summary.replace('<p>', '').replace('</p>', '').split(' ').join(' ') : film.summary.replace('<p>', '').replace('</p>', '') : 'No summary'
					return (
						<div class="col mt-2">
							<div class="card">
								<img src={film.image ? film.image.medium : 'https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-300x245.jpg'} class="card-img-top" alt="..." />
								<div class="card-body">
								<h5 class="card-title">{film.name}</h5>
									<h6 class="card-title">Season {film.season} Episode {film.number}</h6>
									<p class="card-text">
										{summary}
									</p>
								</div>
								<a href={film.url} target="_blank" rel="noreferrer" className="btn btn-danger">Go to website</a>
							</div>
						</div>
					);
				}) : 'Something went wrong please try again!'}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		episodes: state.episodes.data
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Episodes);
