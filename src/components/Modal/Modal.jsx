import React, { Component } from 'react';

import {
    ModalStyled,
    Overlay,
} from './Modal.styled';

export class Modal extends Component {
  handleClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose('');
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClose);
  }

  handleClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose('');
    }
  };

    handleBackdropeClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onModalClose();
    }
    };
    
    render() {

    return (
      <Overlay onClick={this.handleBackdropeClick}>
        < ModalStyled>
          {this.props.children}
        </ ModalStyled>
      </Overlay>
    );
  }
}
