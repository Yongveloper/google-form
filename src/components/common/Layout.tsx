import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  max-width: 768px;
  flex-direction: column;
  gap: 12px;
  padding: 38px 0;
`;

interface ILayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return <Container>{children}</Container>;
}

export default Layout;
