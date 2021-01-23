import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// source: https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
// zurfyx's answer

const ScrollToTop = ({ history, children }) => {
  useEffect(() => {
    const scrollToTop = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      scrollToTop();
    };
  }, []);
  return <>{children}</>;
};

export default withRouter(ScrollToTop);
