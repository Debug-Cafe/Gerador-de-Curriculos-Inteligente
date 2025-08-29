import React from "react";
import type { ErrorInfo } from "react";


class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Erro capturado pelo ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Ocorreu um erro. Tente novamente mais tarde.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
