import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children }) => (
  <main className="container pt-5">{children}</main>
);

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Content;
