import React, { useEffect, useState } from 'react'
import { Alert, Card, ListGroup, Nav, Form } from 'react-bootstrap'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import About from './About'
import Loading from './Loading'
import Recipe from './Recipe'
import FuzzySet from 'fuzzyset'

const Home: React.FC = () => {
  const [recipeList, setRecipeList] = useState<any[]>()
  const [filteredRecipeIndices, setFilteredRecipeIndices] = useState<number[]>()
  const [searchBarText, setSearchBarText] = useState<string>('')
  const [fuzzyRecipeTags, setFuzzyRecipeTags] = useState<FuzzySet>()
  const [tagToRecipeIndices, setTagToRecipeIndices] = useState<Map<string, number[]>>()

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/recipe-data/recipe-list.json')
      .then((response) => response.text())
      .then((data) => setRecipeList(JSON.parse(data)))
  }, [])

  useEffect(() => {
    if (recipeList) {
      const recipeTags = recipeList.map((recipe: any) => recipe.tags.concat([recipe.title]))
      setTagToRecipeIndices(
        recipeTags.reduce((bucket: Map<string, number[]>, tags: string[], recipeIndex: number) => {
          tags.forEach((tag: string) =>
            bucket.set(tag, bucket.get(tag)?.concat([recipeIndex]) || [recipeIndex])
          )
          return bucket
        }, new Map())
      )
      setFuzzyRecipeTags(FuzzySet(recipeTags.flat()))
    }
  }, [recipeList])

  useEffect(() => {
    if (searchBarText) {
      const matchingTags =
        fuzzyRecipeTags?.get(searchBarText)?.flatMap(([_, tag]: [number, string]) => tag) || []
      const indices = matchingTags
        .flatMap((tag: string) => tagToRecipeIndices?.get(tag) || [])
        // Remove duplicates, but preserve order.
        .reverse()
        .filter(
          (recipeIndex: number, arrayIndex: number, array: number[]) =>
            array.lastIndexOf(recipeIndex) === arrayIndex
        )
        .reverse()
      setFilteredRecipeIndices(indices)
    } else {
      setFilteredRecipeIndices(recipeList?.map((_: any, index: number) => index) || [])
    }
  }, [recipeList, searchBarText, fuzzyRecipeTags, tagToRecipeIndices])

  const handleSearchBarChange = (event: any) => {
    event.preventDefault()
    setSearchBarText(event.target.value)
  }

  const handleSearchBarSubmit = (event: any) => {
    event.preventDefault()
  }

  // TODO: Handle different categories.
  return filteredRecipeIndices ? (
    <div>
      <Card.Title>Recipe List</Card.Title>

      <Form onSubmit={handleSearchBarSubmit}>
        <Form.Group>
          <Form.Control placeholder={'Search for a recipe!'} onChange={handleSearchBarChange} />
        </Form.Group>
      </Form>

      <ListGroup>
        {filteredRecipeIndices.map((index: number) => (
          <ListGroup.Item key={index}>
            <Link to={process.env.PUBLIC_URL + '/recipe/' + recipeList![index].filename}>
              {recipeList![index].title}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  ) : (
    <Loading />
  )
}

const BadURL: React.FC = () => {
  return <Alert variant="danger">Invalid URL.</Alert>
}

const getRecipe = (props: any) => <Recipe recipeName={props.match.params.recipeName} />

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link as={Link} to={process.env.PUBLIC_URL + '/'}>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={process.env.PUBLIC_URL + '/about'}>
                About
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Switch>
            <Route path={process.env.PUBLIC_URL + '/'} exact={true} component={Home} />
            <Route path={process.env.PUBLIC_URL + '/about'} exact={true} component={About} />
            <Route
              path={process.env.PUBLIC_URL + '/recipe/:recipeName'}
              exact={true}
              component={getRecipe}
            />
            <Route component={BadURL} />
          </Switch>
        </Card.Body>
      </Card>
    </BrowserRouter>
  )
}

export default App
