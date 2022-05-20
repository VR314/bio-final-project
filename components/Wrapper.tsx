import React from 'react';

// ALL WRAPPER STYLING HAPPENS HERE
const Wrapper = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
};

export default Wrapper;
