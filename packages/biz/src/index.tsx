import * as React from 'react'
import styled from 'styled-components/primitives'
import {View} from "react-primitives";

const Outer = styled.Text`
  color: blue;
  font-weight: bold;
`;

const Inner = styled.Text`
  color: green;
`;

export const Biz = () => <View><Outer>biz <Inner>baz</Inner></Outer></View>
