import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEpisodes } from '../../redux/episodes/episodesActions';

const Seasons = (props) => {
	const seasons = useSelector(state => state.seasons.data)
	const dispatch = useDispatch()
	return (
		<div>
		<div>
				<Link to="/"><button className="btn btn-light">Go Back</button></Link>
			</div>
			<div class="row row-cols-1 row-cols-md-4 g-4">
				{seasons.map((film) => 
				{	
                    const summary = film.summary ?  film.summary.replace('<p>', '').replace('</p>', '').split(' ').length >= 30 ? film.summary.replace('<p>', '').replace('</p>', '').split(' ').join(' ') : film.summary.replace('<p>', '').replace('</p>', '') : 'No summary'
                    return <div id={film.id} key={film.id} class="col mt-2">
						<div class="card">
							<img src={film.image ? film.image.medium : 'https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-300x245.jpg'} class="card-img-top" alt="..." />
							<div class="card-body">
								<h5 class="card-title" style={{ textTransform: 'capitalize' }}>
									{film.url
										.replace(`http://www.tvmaze.com/seasons/${film.id}/`, '')
										.replaceAll('-', ' ')}
								</h5>
								<p class="card-text">
									{summary}
								</p>
                                <Link id={film.id} onClick={(e) => dispatch(fetchEpisodes(`http://api.tvmaze.com/seasons/${e.target.id}/episodes`))} to="/seasons/episodes" className="btn btn-primary">Episodes</Link>
							</div>
						</div>
					</div>}
				)}
			</div>
		</div>
	);
};


export default (Seasons);
