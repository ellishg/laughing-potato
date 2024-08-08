import React, { useEffect, useState } from 'react'
import { Alert, ButtonGroup, Card, Image, ListGroup, ToggleButton } from 'react-bootstrap'
import Loading from './Loading'
import { useParams } from 'react-router-dom'

const toNearestFraction = (x: number) => {
  const epsilon = 0.001
  const whole = Math.trunc(x + epsilon)
  const part = x - whole
  const fraction =
    part < 1 / 8 / 2
      ? null
      : part < 1 / 8 + (1 / 4 - 1 / 8) / 2
      ? '1/8'
      : part < 1 / 4 + (1 / 3 - 1 / 4) / 2
      ? '1/4'
      : part < 1 / 3 + (3 / 8 - 1 / 3) / 2
      ? '1/3'
      : part < 3 / 8 + (1 / 2 - 3 / 8) / 2
      ? '3/8'
      : part < 1 / 2 + (5 / 8 - 1 / 2) / 2
      ? '1/2'
      : part < 5 / 8 + (2 / 3 - 5 / 8) / 2
      ? '5/8'
      : part < 2 / 3 + (3 / 4 - 2 / 3) / 2
      ? '2/3'
      : part < 3 / 4 + (7 / 8 - 3 / 4) / 2
      ? '3/4'
      : '7/8'
  return whole === 0 ? (fraction ? fraction : '0') : `${whole}` + (fraction ? ` ${fraction}` : '')
}

const ingredientAmountToString = (ingredient: any, useMetricUnits: boolean) => {
  const unitConversions = require('./unit-conversions')
  const unitToAbbreviation: Map<string, string> = new Map([
    ['grams', 'g'],
    ['tablespoons', 'tbsp.'],
    ['teaspoons', 'tsp.'],
    ['ounces', 'oz'],
  ])

  if (!ingredient.unit) {
    return toNearestFraction(ingredient.amount)
  } else {
    let amount = ingredient.amount
    let unit = ingredient.unit
    if (ingredient.name in unitConversions) {
      const { cups, grams } = unitConversions[ingredient.name]
      if (useMetricUnits && unit === 'cups') {
        amount = (amount * grams) / cups
        unit = 'grams'
      } else if (!useMetricUnits && unit === 'grams') {
        amount = (amount * cups) / grams
        unit = 'cups'
      }
    }
    return `${toNearestFraction(amount)} ${unitToAbbreviation.get(unit) || unit}`
  }
}

const RecipeError: React.FC<{ recipeName: string | undefined }> = ({ recipeName }) => {
  return (
    <Alert variant="danger">
      <Alert.Heading>Could not find recipe '{recipeName}'.</Alert.Heading>
      <p>
        Found a bug? Report it at{' '}
        <Alert.Link href="https://github.com/ellishg/laughing-potato/issues">
          https://github.com/ellishg/laughing-potato/issues
        </Alert.Link>
        .
      </p>
    </Alert>
  )
}

const Recipe: React.FC = () => {
  const { recipeName } = useParams()
  const [recipe, setRecipe] = useState<any>()
  // FIXME: Dev doesn't think this needs to be this complicated.
  const [useMetricUnits, setUseMetricUnits] = useState<boolean>(
    () => localStorage.getItem('useMetricUnit') === true.toString()
  )
  const setMetric = () => setUseMetricUnits(true)
  const setImperial = () => setUseMetricUnits(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    if (!(localStorage.getItem('useMetricUnit') === useMetricUnits.toString())) {
      localStorage.setItem('useMetricUnit', useMetricUnits.toString())
    }
  }, [useMetricUnits])

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/recipe-data/' + recipeName + '.json')
      .then((response) => response.text())
      .then((data) => setRecipe(JSON.parse(data)))
      .catch((error) => setErrorMessage(error.message))
  }, [recipeName])

  return errorMessage ? (
    <RecipeError recipeName={recipeName} />
  ) : recipe ? (
    <>
      <Card.Title as="h1">{recipe.title}</Card.Title>
      <ButtonGroup>
        <ToggleButton
          id="set-metric"
          type="radio"
          value={useMetricUnits.toString()}
          checked={useMetricUnits}
          onChange={setMetric}
        >
          Metric
        </ToggleButton>
        <ToggleButton
          id="set-imperial"
          type="radio"
          value={(!useMetricUnits).toString()}
          checked={!useMetricUnits}
          onChange={setImperial}
        >
          Imperial
        </ToggleButton>
      </ButtonGroup>
      <Card.Text>{recipe.description}</Card.Text>

      {/* TODO: Use better style, click to enlarge. */}
      {recipe.images.map((path: string, index: number) => (
        <Image
          src={process.env.PUBLIC_URL + '/' + path}
          rounded={true}
          style={{ width: '8rem' }}
          key={index}
        />
      ))}

      <Card.Header as="h2">Ingredients</Card.Header>
      {/* TODO: Set max width. */}
      <Card.Body>
        <ListGroup>
          {recipe.ingredients.map((ingredient: any, index: number) => (
            <ListGroup.Item key={index}>
              {ingredientAmountToString(ingredient, useMetricUnits)} {ingredient.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
      <Card.Header as="h2">Directions</Card.Header>
      {/* TODO: Set max width. */}
      <Card.Body>
        <ol>
          {recipe.directions.map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </Card.Body>
      <Card.Footer>
        {recipe.authors && <p>Special thanks to {recipe.authors.join(', ')} for this recipe.</p>}
        Found a typo? Please submit a pull request for{' '}
        <Card.Link
          href={
            'https://github.com/ellishg/urban-bassoon/blob/main/recipes/' + recipeName + '.yaml'
          }
        >
          {'https://github.com/ellishg/urban-bassoon/blob/main/recipes/' + recipeName + '.yaml'}
        </Card.Link>
        .
      </Card.Footer>
    </>
  ) : (
    <Loading />
  )
}

export default Recipe
