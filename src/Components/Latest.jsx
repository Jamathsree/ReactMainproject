import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { DataContext, imageUrl } from '../App';

function Latest() {
    const { data } = useContext(DataContext);
    const [latest, setLatest] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const imageUrl = "https://image.tmdb.org/t/p/original";

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=9948beaa1978b07ef733bcbe5e8d2849&with_genres=28`
            );
            if (response.data && response.data.results) {
                setLatest(response.data.results);
            }
        } catch (error) {
            console.error('Error fetching latest movies:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleShowModal = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMovie(null);
    };

    return (
        <div className="container">
            <br />
            <input
                type="text"
                placeholder="Search for a movie"
                value={searchQuery}
                onChange={handleSearch}
                style={{ marginBottom: '20px', padding: '10px', width: '20%', marginLeft: '1000px' }}
            />
            <br />
            <div className="row">
                {latest &&
                    latest
                        .filter((movie) => movie.original_title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((movie) => (
                            <div key={movie.id} className="col-lg-4 col-md-6 mb-4">
                                <Card style={{ width: '100%' }} onClick={() => handleShowModal(movie)}>
                                    <Card.Img
                                        variant="top"
                                        src={`${imageUrl}${movie.backdrop_path}`}
                                        alt={movie.original_title}
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                    <Card.Body>
                                        <Card.Title>
                                            <h3 style={{ margin: '10px 0', textAlign: 'center' }}>
                                                {movie.original_title}
                                            </h3>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
            </div>

            {/* Modal for displaying movie details */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedMovie && selectedMovie.original_title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMovie && (
                        <div>
                            <img
                                src={`${imageUrl}${selectedMovie.poster_path}`}
                                alt={selectedMovie.title}
                                style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
                            />
                            <p>Release Date: {selectedMovie.release_date}</p>
                            <p>Overview: {selectedMovie.overview}</p>
                            <p>Rating: {selectedMovie.vote_average}</p>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Latest;
