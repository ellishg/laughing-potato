import React, { useEffect, useState } from 'react';
import { Alert, ButtonGroup, Card, Image, ListGroup, ToggleButton } from 'react-bootstrap';
import YAML from 'yaml';
import Loading from './Loading';
import IngredientType from './types/IngredientType';
import RecipeType from './types/RecipeType';

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
    fetch(process.env.PUBLIC_URL + '/recipes/' + recipeName + '.yaml')
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
    fetch(process.env.PUBLIC_URL + '/unit-conversions.yaml')
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

        {/* TODO: Use better style, click to enlarge. */}
        {recipe.images.map((path: string, index: number) =>
          <Image
            src={process.env.PUBLIC_URL + '/' + path}
            rounded style={{ width: '8rem' }}
            key={index}
          />
        )}

        <Card.Header as="h2">Ingredients</Card.Header>
        {/* TODO: Set max width. */}
        <Card.Body>
          <ListGroup>
            {recipe.ingredients.map((ingredient: IngredientType, index: number) =>
              <ListGroup.Item key={index}>
                {ingredient.getAmount(unitConversions, useMetricUnits)} {ingredient.name}
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

export default Recipe;