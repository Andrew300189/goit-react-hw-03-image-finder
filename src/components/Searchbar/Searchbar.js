import React, { Component } from 'react';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <div className={styles.inputContainer}>
        <header className={styles.searchForm}>
          <form className={styles.search} onSubmit={this.handleSubmit}>
            <input
              className={styles.input}
              type="text"
              autoComplete="off"
              autoFocus
              value={this.state.query}
              onChange={this.handleChange}
            />
          </form>
        </header>
      </div>
    );
  }
}

export default Searchbar;
