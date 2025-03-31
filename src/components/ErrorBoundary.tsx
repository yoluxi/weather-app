import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

const ErrorContainer = styled.div`
  padding: 20px;
  margin: 10px;
  background-color: #ffebee;
  border-radius: 8px;
  color: #c62828;
  text-align: center;
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('组件错误:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <h3>出现了一些问题</h3>
          <p>请尝试刷新页面或稍后再试</p>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;