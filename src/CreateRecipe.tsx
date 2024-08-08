import React, { useState, useRef } from 'react'
import { Card, Button, Overlay, Tooltip, Form, Row, Col } from 'react-bootstrap'
import YAML from 'yaml'
import stringMath from 'string-math'

const YamlFile: React.FC<{ recipe: any }> = ({ recipe }) => {
  const recipeString = YAML.stringify(recipe)
  const [justCoppied, setJustCoppied] = useState<boolean>(false)
  const buttonTarget = useRef(null)

  const copyToClipboard = () => {
    const el = document.createElement('textarea')
    el.value = recipeString
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    setJustCoppied(true)
    setTimeout(() => setJustCoppied(false), 3000)
  }

  return (
    <Card>
      <Card.Header>YAML</Card.Header>
      <Card.Body>
        <Card.Text as="pre">{recipeString}</Card.Text>
        <Button ref={buttonTarget} onClick={copyToClipboard}>
          Click To Copy Recipe
        </Button>
        <Overlay target={buttonTarget.current} placement="right" show={justCoppied}>
          <Tooltip id="button-tooltip">Coppied to clipboard!</Tooltip>
        </Overlay>
      </Card.Body>
    </Card>
  )
}

const IngredientsForm: React.FC<{
  ingredients: any[]
  updateIngredients: React.Dispatch<React.SetStateAction<any[]>>
}> = ({ ingredients, updateIngredients }) => {
  const onIngredientAmountChange = (event: any) => {
    const value = stringMath(event.target.value, () => undefined)
    const index = Number(event.target.getAttribute('data-tag'))
    updateIngredients((oldList: any[]) => [
      ...oldList.slice(0, index),
      { ...oldList[index], amount: value },
      ...oldList.slice(index + 1),
    ])
  }
  const onIngredientUnitChange = (event: any) => {
    const value = event.target.value
    const index = Number(event.target.getAttribute('data-tag'))
    updateIngredients((oldList: any[]) => [
      ...oldList.slice(0, index),
      { ...oldList[index], ...(value === '' ? {} : { unit: value }) },
      ...oldList.slice(index + 1),
    ])
  }
  const onIngredientNameChange = (event: any) => {
    const value = event.target.value
    const index = Number(event.target.getAttribute('data-tag'))
    updateIngredients((oldList: any[]) => [
      ...oldList.slice(0, index),
      { ...oldList[index], name: value },
      ...oldList.slice(index + 1),
    ])
  }
  const onAppendIngredient = () => {
    updateIngredients((oldList: any[]) => [...oldList, { name: '', amount: 0 }])
  }
  const onRemoveIngredients = (event: any) => {
    const index = Number(event.target.getAttribute('data-tag'))
    updateIngredients((oldList: any[]) => [...oldList.slice(0, index), ...oldList.slice(index + 1)])
  }

  return (
    <Card>
      <Card.Header>Ingredients</Card.Header>
      <Card.Body>
        {ingredients.map((ingredient: any, index: number) => (
          <Form key={index}>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  data-tag={index}
                  placeholder="Enter a number."
                  value={ingredient.amount}
                  onChange={onIngredientAmountChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Unit</Form.Label>
                <Form.Control
                  data-tag={index}
                  placeholder='e.g., "grams", "cups"'
                  value={ingredient.unit}
                  onChange={onIngredientUnitChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Ingredient</Form.Label>
                <Form.Control
                  data-tag={index}
                  placeholder="Enter a Name."
                  value={ingredient.name}
                  onChange={onIngredientNameChange}
                />
              </Form.Group>
            </Row>
            <Button data-tag={index} onClick={onRemoveIngredients}>
              Remove
            </Button>
          </Form>
        ))}
        <Button onClick={onAppendIngredient}>Add Ingredient</Button>
      </Card.Body>
    </Card>
  )
}

const DirectionsForm: React.FC<{
  directions: string[]
  updateDirections: React.Dispatch<React.SetStateAction<string[]>>
}> = ({ directions, updateDirections }) => {
  const onDirectionChange = (event: any) => {
    const value = event.target.value
    const index = Number(event.target.getAttribute('data-tag'))
    updateDirections((oldList: string[]) => [
      ...oldList.slice(0, index),
      value,
      ...oldList.slice(index + 1),
    ])
  }
  const onAppendDirection = () => {
    updateDirections((oldList: string[]) => [...oldList, ''])
  }
  const onRemoveDirection = (event: any) => {
    const index = Number(event.target.getAttribute('data-tag'))
    updateDirections((oldList: string[]) => [
      ...oldList.slice(0, index),
      ...oldList.slice(index + 1),
    ])
  }

  return (
    <Card>
      <Card.Header>Directions</Card.Header>
      <Card.Body>
        {directions.map((direction: string, index: number) => (
          <Form.Group key={index}>
            <Form.Label>Step {index + 1}</Form.Label>
            <Form.Control data-tag={index} value={direction} onChange={onDirectionChange} />
            <Button data-tag={index} onClick={onRemoveDirection}>
              Remove
            </Button>
          </Form.Group>
        ))}
        <Button onClick={onAppendDirection}>Add Step</Button>
      </Card.Body>
    </Card>
  )
}

const CreateRecipe: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [ingredients, updateIngredients] = useState<any[]>([])
  const [directions, updateDirections] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [authors, setAuthors] = useState<string[]>([])

  const onSubmit = (event: any) => {
    event.preventDefault()
  }

  const onTitleChange = (event: any) => {
    setTitle(event.target.value)
  }
  const onDescriptionChange = (event: any) => {
    setDescription(event.target.value)
  }
  const onTagChange = (event: any) => {
    setTags(event.target.value.split(',').map((tag: string) => tag.trim()))
  }
  const onAuthorChange = (event: any) => {
    setAuthors(event.target.value.split(',').map((author: string) => author.trim()))
  }

  return (
    <Card.Body>
      <Card>
        <Card.Header>Recipe Form</Card.Header>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control placeholder="The name of the recipe." onChange={onTitleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="A brief description of the recipe."
                onChange={onDescriptionChange}
              />
            </Form.Group>
            <IngredientsForm ingredients={ingredients} updateIngredients={updateIngredients} />
            <DirectionsForm directions={directions} updateDirections={updateDirections} />
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <Form.Control
                onChange={onTagChange}
                placeholder={'A comma separated list of tags, e.g., "dinner, pizza, carrots".'}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Authors</Form.Label>
              <Form.Control
                onChange={onAuthorChange}
                placeholder={
                  'A comma separated list of authors, e.g., "Julia Child, Anthony Bourdain, Ellis".'
                }
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <YamlFile
        recipe={{
          title,
          description,
          ingredients: ingredients.map((ingredient: any) => {
            return { ...ingredient, amount: Number(ingredient.amount) || 0 }
          }),
          directions,
          tags,
          authors,
        }}
      />
      Please upload this file to{' '}
      <Card.Link href="https://github.com/ellishg/urban-bassoon/tree/main/recipes">
        https://github.com/ellishg/urban-bassoon/tree/main/recipes
      </Card.Link>{' '}
      and make a pull request.
    </Card.Body>
  )
}

export default CreateRecipe
