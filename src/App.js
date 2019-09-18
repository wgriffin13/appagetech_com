import React, { Component } from 'react';
import { CssBaseline, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import TransitionExample from './TransitionExample';

const theme = createMuiTheme();
class App extends Component{

    render () {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <TransitionExample />
                </ThemeProvider>
            </div>
        )
    }
}

export default App;