import React from 'react';

const Hello = ({ name }) => <h1> Hello {name}! </h1>;

function withNameReact(WrappedComponent) {
  return class extends React.Component {
    render() {
      return <WrappedComponent name="React" {...this.props} />;
    }
  };
}

const HOC = withNameReact(Hello);

export default HOC;