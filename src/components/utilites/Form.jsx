import React from 'react';

export default function Form({
  onSubmit: handleSubmit,
  isValid,
  children,
  ...props
}) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isValid === false) return;
    if (typeof handleSubmit === 'function') handleSubmit(e);
  };

  return (
    <form onSubmit={handleFormSubmit} {...props}>
      {children}
    </form>
  );
}
