import * as React from 'react';
import './style.css';
import TestSketch from './sketches/TestSketch';
import Wrapper from './components/Wrapper';
import Agario from './sketches/Agario';

export default function App() {
  let [pageID, setPageID] = React.useState(0);
  switch (pageID) {
    case 0:
      return (
        <Wrapper title={'G1: Cell Growth'}>
          <Agario setPageID={setPageID} />
        </Wrapper>
      );
    case 1:
      return <h1> test1 </h1>;
    default:
      return <h1> unimplemented page </h1>;
  }
}
