import React from 'react';

const CategorySelector = ({ categories, onSelect }) => {
  console.log('Categories for dropdown:', categories); // Log the categories for dropdown

  const handleChange = (event) => {
    onSelect(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;
