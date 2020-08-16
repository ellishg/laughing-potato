import React, {useState, useEffect} from 'react';
import YAML from 'yaml';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

const Ingredient: React.FC<{ingredient: any}> = ({ingredient}) => {
  // TODO: Convert units.
  return (
    <div>
      {ingredient.amount} {ingredient.unit} {ingredient.title}
    </div>
  );
};

const Recipe: React.FC<{recipeName: string}> = ({recipeName}) => {
  const [recipe, setRecipe] = useState<any>();

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + 'recipes/' + recipeName + '.yaml')
      .then(response => response.text())
      .then(data => setRecipe(YAML.parse(data)));
  }, []);

  return (
    recipe ? (
      <div>
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        {
          recipe.bake ?
            <div>
              <div>Bake time: {recipe.bake.time}</div>
              <div>Bake temperature: {recipe.bake.temperature}</div>
            </div>
            : null
        }
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient: any) =>
            <li key={ingredient.title}>
              <Ingredient ingredient={ingredient} />
            </li>
          )}
        </ul>
        <h3>Directions</h3>
        <ol>
          {recipe.directions.map((step: any, index: number) =>
            <li key={index}>
              {step}
            </li>
          )}
        </ol>
      </div>
    ) : <h1>Loading...</h1>
  );
};

const Home: React.FC = () => {
  const [recipeList, setRecipeList] = useState<string[]>();

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + 'recipes/recipes.yaml')
      .then(response => response.text())
      .then(data => setRecipeList(YAML.parse(data)));
  }, []);

  // TODO: Handle different categories.
  return recipeList ? (
    <div>
      <h1>Recipe List</h1>
      <ul>
        {recipeList.map(recipeName =>
          <li><Link to={`/${recipeName}`}>{recipeName}</Link></li>
        )}
      </ul>
    </div>
  ) : <h1>Loading...</h1>;
};

const About: React.FC = () => {
  return (
    <div>
      <h1>About</h1>
      <p>These are some recipes!</p>
    </div>
  )
};

const App: React.FC = () => {
   return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/:recipeName" exact component={(props: any) =>
              <Recipe recipeName={props.match.params.recipeName} />
            } />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
