/*
 * @Author: W·S
 * @Date: 2022-09-16 12:09:48
 * @LastEditors: W·S
 * @LastEditTime: 2022-12-20 00:47:54
 * @Description: Description
 */

import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props: { children: JSX.Element }) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render will show the fallback UI
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if ((this.state as { hasError: boolean }).hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    // Return children components in case of no error
    // eslint-disable-next-line
        // @ts-ignore
    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}
