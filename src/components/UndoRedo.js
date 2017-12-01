import React from 'react';
import { ActionCreators as UndoActionCreators} from 'redux-undo';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
  		canUndo: state.todos.past.length > 0,
  		canRedo: state.todos.future.length > 0
  };
}

function mapDispatchToProps(dispatch) {
	return{
		onUndo: () => dispatch(UndoActionCreators.undo()),
		onRedo: () => dispatch(UndoActionCreators.redo())
	}
}

export class UndoRedo extends React.Component {
  render() {
  	const {onUndo, onRedo, canUndo, canRedo} = this.props;
    return (
      <p>
		    <button onClick={onUndo} disabled={!canUndo}>
		      Undo
		    </button>
		    <button onClick={onRedo} disabled={!canRedo}>
		      Redo
		    </button>
  		</p>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
// Implement map dispatch to props
)(UndoRedo)
