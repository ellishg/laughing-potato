import React from 'react';
import { Card } from 'react-bootstrap';

const About: React.FC = () => {
  return (
    <div>
      <Card.Title>About</Card.Title>
      <Card.Link href="https://github.com/ellishg/laughing-potato">
        github.com/ellishg/laughing-potato
      </Card.Link>
      <Card.Text>
        This is a simple collection of recipes that are easy to read. If you would like to add your own recipe, please make a pull request at <a href="https://github.com/ellishg/urban-bassoon">github.com/ellishg/urban-bassoon</a>.
      </Card.Text>
    </div>
  );
};

export default About