import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {
  closeAddDialog,
  inputRecipe,
  addRecipe,
  showErrorMessage,
  hideErrorMessages,
} from '../actions';

const AddDialog = ({
  addDialogIsOpen,
  dialogRecipeName,
  dialogIngredients,
  inputNameError,
  inputIngredientsError,
  closeAddDialog,
  inputRecipe,
  addRecipe,
  showErrorMessage,
  hideErrorMessages,
}) => {
  const handleInput = (event) => {
    inputRecipe(event.target.value, event.target.id);
  };

  const handleAdd = () => {
    if (dialogRecipeName && dialogIngredients) {
      const ingredients = (dialogIngredients.split(',')).map(ingredient => {
        return ingredient.trim();
      });

      addRecipe(uuidv4(), dialogRecipeName, ingredients);
    } else {
      if (!dialogRecipeName) {
        showErrorMessage('inputNameError', 'This is a required field');
      }
      if (!inputIngredientsError) {
        showErrorMessage('inputIngredientsError', 'This is a required field');
      }

      window.setTimeout(() => {
        hideErrorMessages();
      }, 3000);
    }
  };

  const addDialogActions = [
    <FlatButton
      label="Cancel"
      primary={true}
      keyboardFocused={true}
      onTouchTap={closeAddDialog}
    />,
    <FlatButton
      label="Add"
      secondary={true}
      onTouchTap={handleAdd}
    />,
  ];
  const mobile = window.innerWidth > 760 ? false : true;
  const style = {
    dialogTitle: {
      padding: '6px 24px'
    },
    dialogBody: {
      padding: '0 24px 0 24px',
      border: 'none',
    },
  };

  return (
    <Dialog
      title="Add recipe"
      actions={addDialogActions}
      modal={false}
      open={addDialogIsOpen}
      autoDetectWindowHeight={false}
      autoScrollBodyContent={true}
      onRequestClose={closeAddDialog}
      titleStyle={mobile ? style.dialogTitle : {}}
      bodyStyle={mobile ? style.dialogBody: {}} >
      <TextField
        id="dialogRecipeName"
        hintText="Enter a recipe name here"
        floatingLabelText="Recipe Name"
        floatingLabelFixed={true}
        errorText={inputNameError}
        fullWidth={true}
        value={dialogRecipeName}
        onChange={handleInput}
      /><br />
      <TextField
        id="dialogIngredients"
        hintText="Enter ingredients divided by coma"
        floatingLabelText="Ingredients"
        floatingLabelFixed={true}
        errorText={inputIngredientsError}
        multiLine={true}
        fullWidth={true}
        value={dialogIngredients}
        onChange={handleInput}
      /><br />
    </Dialog>
  );
};

AddDialog.propTypes = {
  addDialogIsOpen: PropTypes.bool,
  dialogRecipeName: PropTypes.string,
  dialogIngredients: PropTypes.string,
  inputNameError: PropTypes.string,
  inputIngredientsError: PropTypes.string,
  closeAddDialog: PropTypes.func,
  inputRecipe: PropTypes.func,
  showErrorMessage: PropTypes.func,
  hideErrorMessages: PropTypes.func,
};

const mapStateToProps = (state) => ({
  addDialogIsOpen: state.dialogs.addDialogIsOpen,
  dialogRecipeName: state.input.dialogRecipeName,
  dialogIngredients: state.input.dialogIngredients,
  inputNameError: state.errors.inputNameError,
  inputIngredientsError: state.errors.inputIngredientsError,
});

export default connect(mapStateToProps, {
  closeAddDialog,
  inputRecipe,
  addRecipe,
  showErrorMessage,
  hideErrorMessages,
})(AddDialog);
