import React, {useState, useEffect} from 'react';
import YAML from 'yaml';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Alert, Card, Spinner, Nav, ListGroup } from 'react-bootstrap';

const isValidIngredient = (ingredient: any) => (
  ('name' in ingredient)
  && ('amount' in ingredient)
  && ('unit' in ingredient)
);

const isValidRecipe = (recipe: any) => (
  ('title' in recipe)
  && ('description' in recipe)
  && ('ingredients' in recipe)
  && recipe.ingredients.every(isValidIngredient)
  && ('directions' in recipe)
);

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
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + 'recipes/' + recipeName + '.yaml')
      .then(response => response.text())
      .then(data => {
        const recipe = YAML.parse(data);
        if (isValidRecipe(recipe)) {
          setRecipe(recipe)
        } else {
          throw new Error("Unable to parse YAML.");
        }
      })
      .catch(error => setErrorMessage(error.message));
  }, [recipeName]);

  return (
    errorMessage ? (
      <Alert variant='danger'>Could not find recipe for "{recipeName}"</Alert>
    ) : recipe ? (
      <div>
        <Card.Title as="h1">{recipe.title}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <Card.Header as="h2">Ingredients</Card.Header>
        {/* TODO: Set max width. */}
        <Card.Body>
          <ListGroup>
            {recipe.ingredients.map((ingredient: any, index: number) =>
              <ListGroup.Item key={index}>
                <Ingredient ingredient={ingredient} />
              </ListGroup.Item>
              )}
          </ListGroup>
        </Card.Body>
        <Card.Header as="h2">Directions</Card.Header>
        {/* TODO: Set max width. */}
        <Card.Body>
          <ol>
          {recipe.directions.map((step: any, index: number) =>
            <li key={index}>{step}</li>
            )}
          </ol>
        </Card.Body>
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

const BadURL: React.FC = () => {
  return (
    <Alert variant='danger'>Invalid URL.</Alert>
  );
};

const Loading: React.FC = () => {
  // TODO: Center spinner.
  return (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

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
            <Route component={BadURL} />
          </Switch>
        </Card.Body>
      </Card>
    </BrowserRouter>
  );
}

export default App;
