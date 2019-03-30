import * as React from 'react'
import styled from 'styled-components/primitives'
import {View} from "react-primitives";
import {Inner} from "./Inner";

const Outer = styled.Text`
  color: blue;
  font-weight: bold;
`;

export const Biz = () => <View><Outer>bar <Inner /></Outer></View>
