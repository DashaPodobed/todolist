import React, {useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import {Login} from "../features/login/login";
import {Route, Switch, Redirect} from 'react-router-dom'
import {logoutTC} from "../features/login/authReducer";
import {AppRootStateType} from "./store";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    // @ts-ignore
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(initializeAppTC())
    }, [])

    const authLogoutHandler = () => {
        dispatch(logoutTC())
    }

    if(!isInitialized){
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" />
                    {isLoggedIn && <Button color="inherit" onClick={authLogoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    {/*<Route path={'/404'} render={()=><h1>404: PAGE NOT FOUND</h1>}/>*/}
                    {/*<Redirect from={'*'} to={'/404'}/>*/}
                </Switch>
            </Container>
        </div>
    )
}

export default App
