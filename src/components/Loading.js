import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  },
};

const Loading = ({ text, speed }) => {
  const [content, setContent] = useState(text);

  useEffect(() => {
    window.setInterval(() => {
      content === text + '...' ? setContent(text) : setContent(content + '.');
    }, speed);
  }, [content, speed, text]);

  return <p style={styles.content}>{content}</p>;
};

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300,
};

export default Loading;
