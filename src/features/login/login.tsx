//https://www.youtube.com/watch?v=6VmVYi9yrAA
import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./authReducer";
import {AppRootStateType} from "../../app/store";
import {Redirect} from "react-router-dom";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Must be 3 characters or more';
            }
            return errors;
        },
        onSubmit: values => {
            // alert(JSON.stringify(values));
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn){
        return <Redirect to={'/'}/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered 
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}>here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>

                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            // name="email"
                            // onChange={formik.handleChange}
                            // value={formik.values.email}
                            label="Email"
                            margin="normal"
                            // onBlur={formik.handleBlur}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <div style={{color: "red"}}>{formik.errors.email}</div>}
                        <TextField
                            // name="password"
                            // onChange={formik.handleChange}
                            // value={formik.values.password}
                            type="password"
                            label="Password"
                            margin="normal"
                            // onBlur={formik.handleBlur}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <div style={{color: "red"}}>{formik.errors.password}</div>}
                        <FormControlLabel
                            // name="rememberMe"
                            // onChange={formik.handleChange}
                            // checked={formik.values.rememberMe}
                            label={'Remember me'}
                            control={<Checkbox/>}
                            {...formik.getFieldProps('rememberMe')}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </form>

            </FormControl>
        </Grid>
    </Grid>
}
