import React, { useEffect, useState } from 'react';
import { Alert, Card, ListGroup, Nav } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import YAML from 'yaml';
import About from './About';
import Loading from './Loading';
import Recipe from './Recipe';

const Home: React.FC = () => {
  const [recipeList, setRecipeList] = useState<any[]>();

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/recipe-list.yaml')
      .then(response => response.text())
      .then(data => setRecipeList(YAML.parse(data)));
  }, []);

  // TODO: Handle different categories.
  // TODO: Add search bar to filter by tags using a fuzzy search.
  return recipeList ? (
    <div>
      <Card.Title>Recipe List</Card.Title>
      <ListGroup>
        {recipeList.map((recipeItem: any, index: number) =>
          <ListGroup.Item key={index}>
            <Link to={process.env.PUBLIC_URL + '/recipe/' + recipeItem.filename}>
              {recipeItem.title}
            </Link>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  ) : <Loading />;
};

const BadURL: React.FC = () => {
  return (
    <Alert variant='danger'>Invalid URL.</Alert>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Card>
        <Card.Header>
          <Nav variant='tabs' defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link as={Link} to={process.env.PUBLIC_URL + '/'}>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={process.env.PUBLIC_URL + '/about'}>About</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Switch>
            <Route path={process.env.PUBLIC_URL + '/'} exact component={Home} />
            <Route path={process.env.PUBLIC_URL + '/about'} exact component={About} />
            <Route path={process.env.PUBLIC_URL + '/recipe/:recipeName'} exact component={(props: any) =>
              <Recipe recipeName={props.match.params.recipeName} />
            } />
            <Route component={BadURL} />
          </Switch>
        </Card.Body>
      </Card>
    </BrowserRouter>
  );
}

export default App;
