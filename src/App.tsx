import React, {useState, useEffect} from 'react';
import YAML from 'yaml';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Card, Spinner, Nav, ListGroup } from 'react-bootstrap';

const Ingredient: React.FC<{ingredient: any}> = ({ingredient}) => {
  // TODO: Convert units.
  return (
    <div>
      {ingredient.amount} {ingredient.unit} {ingredient.name}
    </div>
  );
};

const Recipe: React.FC<{recipeName: string}> = ({recipeName}) => {
  const [recipe, setRecipe] = useState<any>();

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + 'recipes/' + recipeName + '.yaml')
      .then(response => response.text())
      .then(data => setRecipe(YAML.parse(data)));
  }, [recipeName]);

  return (
    recipe ? (
      <div>
        <Card.Title as="h1">{recipe.title}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <Card.Header as="h2">Ingredints</Card.Header>
        {/* TODO: Set max width. */}
        <ListGroup>
          {recipe.ingredients.map((ingredient: any, index: number) =>
            <ListGroup.Item key={index}>
              <Ingredient ingredient={ingredient} />
            </ListGroup.Item>
            )}
        </ListGroup>
        <Card.Header as="h2">Directions</Card.Header>
        {/* TODO: Set max width. */}
        <ol>
        {recipe.directions.map((step: any, index: number) =>
          <li key={index}>{step}</li>
          )}
        </ol>
      </div>
    ) : <Loading />
  );
};

const Home: React.FC = () => {
  const [recipeList, setRecipeList] = useState<string[]>();

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + 'recipe-list.yaml')
      .then(response => response.text())
      .then(data => setRecipeList(YAML.parse(data)));
  }, []);

  // TODO: Handle different categories.
  return recipeList ? (
    <div>
      <Card.Title>Recipe List</Card.Title>
      <ListGroup>
        {recipeList.map((recipeName: any, index: number) =>
          <ListGroup.Item key={index}>
            <Link to={`/${recipeName}`}>{recipeName}</Link>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  ) : <Loading />;
};

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

const Loading: React.FC = () => {
  // TODO: Center spinner.
  return (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Card>
        <Card.Header>
          <Nav variant='tabs' defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link as={Link} to='/'>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to='/about'>About</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/about' exact component={About} />
            <Route path='/:recipeName' exact component={(props: any) =>
              <Recipe recipeName={props.match.params.recipeName} />
            } />
          </Switch>
        </Card.Body>
      </Card>
    </BrowserRouter>
  );
}

export default App;
