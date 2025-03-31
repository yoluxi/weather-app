import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 0.8; }
  100% { opacity: 0.6; }
`;

const Card = styled.div`
  background: #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  margin: 10px;
  width: 200px;
  height: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${pulse} 1.5s infinite;
`;

const Line = styled.div<{ width: string, height: string }>`
  background: #cccccc;
  border-radius: 4px;
  width: ${props => props.width};
  height: ${props => props.height};
  margin: 10px auto;
`;

const SkeletonCard: React.FC = () => {
  return (
    <Card>
      <Line width="70%" height="20px" />
      <Line width="50%" height="50px" />
      <Line width="90%" height="24px" />
      <Line width="80%" height="16px" />
      <Line width="60%" height="16px" />
      <Line width="70%" height="16px" />
    </Card>
  );
};

export default SkeletonCard;