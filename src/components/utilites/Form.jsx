import React from 'react';

export default function Form({ onSubmit: handleSubmit, children, ...props }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (typeof handleSubmit === 'function') handleSubmit(e);
  };

  return (
    <form onSubmit={handleFormSubmit} {...props}>
      {children}
    </form>
  );
}
