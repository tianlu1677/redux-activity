import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {

  };
}

export class Reddit extends React.Component {
  static propTypes = {
    
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Reddit</div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(Reddit)
