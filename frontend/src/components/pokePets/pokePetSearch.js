import React, { useState } from 'react';

const PokePetSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value); // Trigger search with updated input value
    };

    return (
        <div className="my-3">
            <input
                type="text"
                placeholder="Search pokePets..."
                value={searchTerm}
                onChange={handleChange}
                className="form-control"
            />
        </div>
    );
};

export default PokePetSearch;
