import * as React from "react";
import {foo} from '@chatapp/foo'
import {Bar} from '@chatapp/bar'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
`;

const Item = styled.div`
  margin: 8px;
`;

export default () => (
  <Container>
      <Item>
          Imported .ts file
          <div>{foo}</div>
      </Item>
      <Item>
          Imported .tsx file
          <div><Bar /></div>
      </Item>
  </Container>
)
