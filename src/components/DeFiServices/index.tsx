import React, { ReactElement } from 'react';
import DeFiService from './DeFiService';
import styled from 'styled-components';

const ServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
`;

function DeFiServices(): ReactElement {
  // This object is what we could imagine we would get back from an API or DB
  const services = [
    { name: 'Compound', APY: 0.05 },
    { name: 'Aave', APY: 0.03 },
    { name: 'Curve', APY: 0.025 },
  ];
  return (
    <ServicesContainer>
      {services.map((service) => (
        <DeFiService key={service.name} name={service.name} APY={service.APY} />
      ))}
    </ServicesContainer>
  );
}

export default DeFiServices;
