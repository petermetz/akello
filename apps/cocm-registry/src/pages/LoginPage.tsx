import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Center
  } from '@mantine/core';
import * as Yup from "yup";

// import classes from './AuthenticationTitle.module.css';
import {Field, Form, Formik} from "formik";

import { SignInForm } from '@akello/react';
import { useNavigate } from 'react-router';
import { useAkello, useRegistry } from '@akello/react-hook';

import classes from './LoginPage.module.css';
import { useState } from 'react';

const LoginPage = () => {
    const navigate = useNavigate();
    const akello = useAkello();
    const [error, setError] = useState<string | null>(null);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string().required('Required')
    });
    
    

    return (
        <Formik initialValues={{
            email: '',
            password: ''
        }} onSubmit={values => {  
          akello.login(values.email, values.password, (token: string) => {
            console.log(token)                        
            navigate('/')
          }, (err: any) => {
            console.log(err)   
            setError(err.message)         
          })

          // let error = onClick(values.email, values.password)
        }}
        validationSchema={LoginSchema}
        >
          {({ errors, touched }) => (    
                <Form>                
                    <div className='w-screen'>
                        <Center>
                            <Container size={420} my={40}>
                                <Title ta="center" className={classes.title}>
                                    Welcome back!
                                </Title>
                                <Text c="dimmed" size="sm" ta="center" mt={5}>
                                    Do not have an account yet?{' '}
                                    <Anchor size="sm" component="button" onClick={() => navigate('/signup')}>
                                        Create account
                                    </Anchor>
                                </Text>

                                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                                    <Field name="email" placeholder={"Enter your email address"} className="input input-bordered bg-white w-full "/>                                    
                                    <div className="label text-error">
                                        {errors.email && touched.email ? (
                                            <div>{errors.email}</div>
                                        ) : null}
                                    </div>                          
                                    <Field type="password" name="password" placeholder={"Enter your password"} className="input input-bordered bg-white w-full "/>
                                    <div className="label text-error">
                                        {errors.password && touched.password ? (
                                            <div>{errors.password}</div>
                                        ) : null}
                                    </div>  
                                    <Group justify="space-between" mt="lg">
                                        <Checkbox label="Remember me" />
                                        <Anchor component="button" size="sm" onClick={() => navigate('/forgot-password')}>
                                            Forgot password?
                                        </Anchor>
                                    </Group>
                                    <Button type='submit' fullWidth mt="xl" className='bg-primary'>
                                        Sign in
                                    </Button>
                                    <div className="label text-error">
                                        {error ? (
                                            <div>{error}</div>
                                        ) : null}
                                    </div>  
                                </Paper>
                            </Container>
                        </Center>
                    </div>
                </Form>  
            )}        
        </Formik>
    );
};


export default LoginPage