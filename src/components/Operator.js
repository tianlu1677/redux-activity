import React from 'react';
import PropTypes from 'prop-types';
class Operator extends React.Component {
  static defaultTypes = {
    operator: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleDelete(e) {
    e.preventDefault();
    console.log('on delete')
    this.props.onDelete('DELETE')
  }
  render() {
    return ( <div> <a href = ''
      onClick = {
        this.handleDelete
      } > delete all. </a> </div> );
  }
}
export default Operator;