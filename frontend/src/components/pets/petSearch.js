import React, { useState } from 'react';

const CompanySearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value); // Trigger search with updated input value
    };

    return (
        <div className="my-3">
            <input
                type="text"
                placeholder="Search pets..."
                value={searchTerm}
                onChange={handleChange}
                className="form-control"
            />
        </div>
    );
};

export default CompanySearch;
