import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { imageUrl } from '../App';
import Modal from 'react-bootstrap/Modal';

function Comedy() {
    const [comed, setComed] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/tv?api_key=9948beaa1978b07ef733bcbe5e8d2849&with_networks=213`
            );
            if (response.data && response.data.results) {
                setComed(response.data.results);
            }
        } catch (error) {
            console.error('Error fetching comedy movies:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMovie(null);
    };

    const filteredMovies = comed.filter((movie) => {
        return movie.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <br />
            <input
                type="text"
                placeholder="Search for a movie"
                value={search}
                onChange={handleSearch}
                style={{marginBottom: '20px', padding: '10px', width: '20%', marginLeft: '1000px',marginTop:'20px' }}
            />
    

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '0 10px' }}>
    {filteredMovies.map((movie) => (
        <div key={movie.id} style={{ flex: '0 0 calc(33.33% - 20px)' }}>
            <Card
                style={{ width: '100%', cursor: 'pointer' }}
                onClick={() => {
                    setShowModal(true);
                    setSelectedMovie(movie);
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
                        <h3>{movie.name}</h3>
                    </Card.Title>
                </Card.Body>
            </Card>
        </div>
    ))}
</div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedMovie && selectedMovie.original_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMovie && (
                        <div>
                            <img
                                src={`${imageUrl}${selectedMovie.poster_path}`}
                                alt={selectedMovie.name}
                                style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
                            />
                            <p>popularity: {selectedMovie.popularity}</p>
                            <p>Overview: {selectedMovie.overview}</p>
                            <p>Rating: {selectedMovie.vote_average}</p>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Comedy;
