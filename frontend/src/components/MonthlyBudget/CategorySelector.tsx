import React, { FC } from 'react';

interface CategorySelectorProps {
  categories: string[];
  onSelect: (category: string) => void;
}

const CategorySelector: FC<CategorySelectorProps> = ({ categories, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;
