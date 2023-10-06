import React, { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    return (
      <div className="overlay" onClick={this.handleOverlayClick}>
        <div className="modal">
          <img src={this.props.imageUrl} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
