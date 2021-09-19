import React, { ReactElement } from 'react';
import DeFiService from './DeFiService';
import styled from 'styled-components';
import { Columns } from 'react-bulma-components';

interface Service {
  name: string;
  APY: number;
}
interface Props {
  services: Service[];
}

const ServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
`;

function DeFiServices({ services }: Props): ReactElement {
  return (
    <Columns>
      {services.map((service) => (
        <DeFiService key={service.name} name={service.name} APY={service.APY} />
      ))}
    </Columns>
  );
}

export default DeFiServices;
