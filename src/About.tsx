import React from 'react'
import { Card } from 'react-bootstrap'

const About: React.FC = () => {
  return (
    <div>
      <Card.Title>About</Card.Title>
      <Card.Text>
        <p>
          The goal of this website is to provide an easy to access list of recipes without any of
          the pains of today's websites. Other sites are plagued with slow loading times and pop-up
          ads that make the experience unpleasant for users who want to quickly review their
          favorite recipes. Our homepage simply contains the list of the hosted recipes along with a
          search bar for quick lookups. Each recipe themselves have a consice description of the
          required ingredients and the directions to follow. The underlying techonology is designed
          to minimize loading times and maximize responsiveness so that it works great even on your
          phone. There are no ads or pop-ups to distract you from the main content.
        </p>
        <p>
          All of the source code is freely available on GitHub at{' '}
          <Card.Link href="https://github.com/ellishg/laughing-potato">
            github.com/ellishg/laughing-potato
          </Card.Link>{' '}
          for anyone to contribute to. If you would like to add your own recipe, please make a pull
          request at{' '}
          <Card.Link href="https://github.com/ellishg/urban-bassoon">
            https://github.com/ellishg/urban-bassoon
          </Card.Link>
          .
        </p>
      </Card.Text>
    </div>
  )
}

export default About
