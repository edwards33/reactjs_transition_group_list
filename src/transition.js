import React, { Component } from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import uuid from 'uuid';
import './transition.css';

class App extends Component {
  items = [
    {
      name: '1. Item',
      id: uuid(),
    },
    {
      name: '2. Item',
      id: uuid(),
    },
    {
      name: '3. Item',
      id: uuid(),
    },
    {
      name: '4. Item',
      id: uuid(),
    },
    {
      name: '5. Item',
      id: uuid(),
    },
    {
      name: '6. Item',
      id: uuid(),
    },
  ];

  state = {
    favorites: [],
  };

  toggleInFavorites = id => {
    let favorites;
    const isItemInFavorites = this.state.favorites.find(
      favorite => favorite.id === id
    );
    if (isItemInFavorites) {
      favorites = this.state.favorites.filter(
        favorite => favorite.id !== id
      );
    } else {
      favorites = [
        ...this.state.favorites,
        this.items.find(item => id === item.id),
      ];
    }
    this.setState({ favorites });
  };

  render() {
    return (
      <div className="container">
        <ul className="ingredients">
          {this.items.map(({ id, name }) => (
            <li
              key={id}
              className="ingredient"
              onClick={() =>
                this.toggleInFavorites(id)
              }
            >
              {name}
              <span className="star">
                {this.state.favorites.find(
                  favorite => favorite.id === id
                )
                  ? '✲'
                  : '✧'}
              </span>
            </li>
          ))}
        </ul>
        <div className="favorites">
          <p>Preferences:</p>
          <TransitionGroup component={null}>
            {this.state.favorites.map(
              ({ id, name }) => (
                <CSSTransition
                  timeout={500}
                  classNames="fade"
                  key={id}
                >
                  <li className="favorite">{name}</li>
                </CSSTransition>
              )
            )}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default App;

