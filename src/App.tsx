import React, {useState, useEffect} from 'react';
import YAML from 'yaml';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Alert, Card, Spinner, Nav, ListGroup, ToggleButton, ButtonGroup} from 'react-bootstrap';

type Ingredient = {'name': string, 'amount': number, 'unit': string};
type Recipe = {'title': string, 'description': string, 'ingredients': Ingredient[], 'directions': string[]};

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

const Ingredient: React.FC<{ingredient: Ingredient, useMetricUnits: boolean}> = ({ingredient, useMetricUnits}) => {

  const conversions: any = {
    'flour': {'cups': 1, 'grams': 136},
    'butter': {'cups': 1, 'grams': 227},
    'white sugar': {'cups': 1, 'grams': 201},
    'sugar': {'cups': 1, 'grams': 201},
  };

  var amount = ingredient.amount;
  var unit = ingredient.unit;
  if (ingredient.name in conversions) {
    const {cups, grams} = conversions[ingredient.name];
    if (useMetricUnits && unit === 'cups') {
      amount = amount * grams / cups;
      unit = 'grams';
    } else if (!useMetricUnits && unit === 'grams') {
      amount = amount * cups / grams;
      unit = 'cups';
    }
  }

  const toNearestFraction = (x: number) => {
    const epsilon = 0.001;
    const whole = Math.trunc(x + epsilon);
    const part = x - whole;
    const fraction = (part < 1/8/2) ? null
      : (part < 1/8 + (1/4-1/8)/2) ? '1/8'
      : (part < 1/4 + (1/3-1/4)/2) ? '1/4'
      : (part < 1/3 + (3/8-1/3)/2) ? '1/3'
      : (part < 3/8 + (1/2-3/8)/2) ? '3/8'
      : (part < 1/2 + (5/8-1/2)/2) ? '1/2'
      : (part < 5/8 + (2/3-5/8)/2) ? '5/8'
      : (part < 2/3 + (3/4-2/3)/2) ? '2/3'
      : (part < 3/4 + (7/8-3/4)/2) ? '3/4'
      : '7/8';
    return whole === 0 ? (fraction ? fraction : '0')
      : `${whole}` + (fraction ? ` ${fraction}` : '');
  };

  return (
    <div>
      {toNearestFraction(amount)} {unit} {ingredient.name}
    </div>
  );
};

const Recipe: React.FC<{recipeName: string}> = ({recipeName}) => {
  const [recipe, setRecipe] = useState<Recipe>();
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
            {recipe.ingredients.map((ingredient: Ingredient, index: number) =>
              <ListGroup.Item key={index}>
                <Ingredient ingredient={ingredient} useMetricUnits={useMetricUnits} />
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
