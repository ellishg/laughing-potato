import React, { useEffect, useState } from 'react';
import { Alert, ButtonGroup, Card, ListGroup, Nav, Spinner, ToggleButton } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import YAML from 'yaml';
import { IngredientType } from './types/IngredientType';
import { RecipeType } from './types/RecipeType';

const Ingredient: React.FC<{ingredient: IngredientType,
                            unitConversions: any,
                            useMetricUnits: boolean}> = ({ingredient,
                                                          unitConversions,
                                                          useMetricUnits}) => {
  return (
    <div>
      {ingredient.getAmount(unitConversions, useMetricUnits)} {ingredient.name}
    </div>
  );
};

const Recipe: React.FC<{recipeName: string}> = ({recipeName}) => {
  const [recipe, setRecipe] = useState<RecipeType>();
  const [unitConversions, setUnitConversions] = useState<any>();
  const [useMetricUnits, setUseMetricUnits] = useState<boolean>(() =>
    localStorage.getItem('useMetricUnit') === true.toString()
  );
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (!(localStorage.getItem('useMetricUnit') === useMetricUnits.toString())) {
      localStorage.setItem('useMetricUnit', useMetricUnits.toString());
    }
  }, [useMetricUnits]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '../recipes/' + recipeName + '.yaml')
      .then(response => response.text())
      .then(data => {
        const recipe = RecipeType.get(YAML.parse(data));
        if (recipe) {
          setRecipe(recipe)
        } else {
          throw new Error("Unable to parse YAML.");
        }
      })
      .catch(error => setErrorMessage(error.message));
    fetch(process.env.PUBLIC_URL + '../unit-conversions.yaml')
      .then(response => response.text())
      .then(data => setUnitConversions(YAML.parse(data)));
  }, [recipeName]);

  return (
    errorMessage ? (
      <Alert variant='danger'>Could not find recipe for '{recipeName}'</Alert>
    ) : recipe && unitConversions ? (
      <div>
        <Card.Title as="h1">
          {recipe.title}
          <ButtonGroup toggle>
            <ToggleButton
              type='radio' value={useMetricUnits.toString()}
              checked={useMetricUnits} onChange={() => setUseMetricUnits(true)}
            >
              Metric
            </ToggleButton>
            <ToggleButton
              type='radio' value={(!useMetricUnits).toString()}
              checked={!useMetricUnits} onChange={() => setUseMetricUnits(false)}
            >
              Imperial
            </ToggleButton>
          </ButtonGroup>
        </Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <Card.Header as="h2">Ingredients</Card.Header>
        {/* TODO: Set max width. */}
        <Card.Body>
          <ListGroup>
            {recipe.ingredients.map((ingredient: IngredientType, index: number) =>
              <ListGroup.Item key={index}>
                <Ingredient ingredient={ingredient}
                            unitConversions={unitConversions}
                            useMetricUnits={useMetricUnits} />
              </ListGroup.Item>
              )}
          </ListGroup>
        </Card.Body>
        <Card.Header as="h2">Directions</Card.Header>
        {/* TODO: Set max width. */}
        <Card.Body>
          <ol>
            {recipe.directions.map((step: string, index: number) =>
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
        {recipeList.map((recipeName: string, index: number) =>
          <ListGroup.Item key={index}>
            <Link to={`/recipe/${recipeName}`}>{recipeName}</Link>
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
            <Route path='/recipe/:recipeName' exact component={(props: any) =>
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
