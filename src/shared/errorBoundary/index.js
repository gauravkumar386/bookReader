import CustomButton from "@/organisms/Button";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }
  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10rem",
          }}
        >
          <h2>Oops, something went wrong!</h2>
          <CustomButton
            onClickButton={() => this.setState({ hasError: false })}
          >
            Try again?
          </CustomButton>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
