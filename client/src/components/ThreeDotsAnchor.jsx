import React from 'react';
import PropTypes from 'prop-types';

const ThreeDotsAnchor = React.forwardRef(({ children, onClick }, ref) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a
    href=""
    className="float-end"
    ref={ref}
    onClick={(event) => {
      event.preventDefault();
      onClick(event);
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="gray" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    </svg>
    {children}
  </a>
));

ThreeDotsAnchor.defaultProps = {
  children: [],
  onClick: () => {},
};

ThreeDotsAnchor.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  onClick: PropTypes.func,
};

export default ThreeDotsAnchor;
