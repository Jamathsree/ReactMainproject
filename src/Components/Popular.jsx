import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { imageUrl } from '../App';

function Popular() {
    const [popul, setPopul] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=9948beaa1978b07ef733bcbe5e8d2849&with_genres=10749`
            );
            if (response.data && response.data.results) {
                setPopul(response.data.results);
            }
        } catch (error) {
            console.error('Error fetching popular movies:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMovie(null);
    };

    const filteredMovies = popul.filter((movie) =>
        movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '0 10px' }}>
            <input
                type="text"
                placeholder="Search for a movie"
                value={searchQuery}
                onChange={handleSearch}
                style={{ marginTop:'20px',marginBottom: '20px', padding: '10px', width: '80%', marginLeft: '1000px' }}
            />
            <br /><br />
            {filteredMovies.map((movie) => (
                <div key={movie.id} style={{ flex: '0 0 calc(33.33% - 20px)' }}>
                    <Card
                        style={{ width: '100%', cursor: 'pointer' }}
                        onClick={() => {
                            setSelectedMovie(movie);
                            setShowModal(true);
                        }}
                    >
                        <Card.Img
                            variant="top"
                            src={`${imageUrl}${movie.backdrop_path}`}
                            alt={movie.original_title}
                            style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                        />
                        <Card.Body>
                            <Card.Title>
                                <h1>{movie.original_title}</h1>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            ))}
           
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedMovie && selectedMovie.original_title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMovie && (
                        <div>
                            <img
                                src={`${imageUrl}${selectedMovie.poster_path}`}
                                alt={selectedMovie.original_title}
                                style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
                            />
                            <p>Overview: {selectedMovie.overview}</p>
                            <p>Rating: {selectedMovie.vote_average}</p>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Popular;
