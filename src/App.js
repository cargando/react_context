import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const FamilyContext = React.createContext({}); // создать объект контекста

const FamilyProvider = FamilyContext.Provider; // тот, который делится данными
const FamilyConsumer = FamilyContext.Consumer; // тот, который будет данные употребялть


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
	        <Grandmother />
        </header>
      </div>
    );
  }
}

export default App;


class Grandmother extends React.Component {

	/*	constructor(props, context) {
			super(props, context);

			this.state = {
				lastName: "Sanchez"
			};
		}
	*/

	state = {
		lastName: "Sanchez",
		age: 28,
	};

	setAge = (age) => {
		this.setState({ age });
};

	render() {

		const transferData = {
			state: this.state,
			setAge: this.setAge,
		};

		return (

			<FamilyProvider value={ transferData }>
				<Mother />
			</FamilyProvider>
		);
	}
}

const Mother = () => {
	return (<Child />);
};

const Child = () => {
	// return (<p>{ lastName }</p>);
	return (
		<FamilyConsumer>
			{
				(data) => {
					return (
						<React.Fragment>
							<p>
								Name is { data.state.lastName }, age is { data.state.age }
							</p><br />
							<button onClick={ ()=>{ data.setAge(data.state.age - 1) } }>decrement Age</button>
							<br />
							<button onClick={ ()=>{ data.setAge(data.state.age + 1) } }>increment Age</button>

						</React.Fragment>);
				}
				/*
					function (lastName) {
						return (<p>{ lastName }</p>);
					}

				 */
			}
		</FamilyConsumer>);
};


// 	const data = '<a onclick="alert(\'YO!!!\')">some text</a>';
// const data2 = <a></a>
// rernder (<div dangerouslySetInnerHTML={ data } />) // - небезопасный способ вставки HTML
//  render (<div> { data2 } </div>) // гарантировано безопасный, т.е. реакт берет на себя всю заботу об обрезании html и пр