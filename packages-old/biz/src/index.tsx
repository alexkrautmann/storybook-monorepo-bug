import * as React from 'react'
import styled from 'styled-components/primitives'
import {View} from "react-primitives";
import {foo} from "@chatapp/foo";

const Outer = styled.Text`
  color: blue;
  font-weight: bold;
`;

const Inner = styled.Text`
  color: green;
`;

const Innerer = styled.Text`
  color: magenta;
`;

export const Biz = () => <View><Outer>biz <Inner>baz <Innerer>{foo}</Innerer></Inner></Outer></View>
