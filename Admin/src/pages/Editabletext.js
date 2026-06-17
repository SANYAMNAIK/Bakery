// EditableText.js

import React, { useState } from 'react';

const EditableText = ({ initialText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(initialText);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={textValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus // Automatically focus on the input field
        />
      ) : (
        <span onClick={handleTextClick}>{textValue}</span>
      )}
    </div>
  );
};

export default EditableText;
