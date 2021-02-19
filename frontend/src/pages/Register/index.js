import react, { useState } from "react";
import api from "../../services/api";
import { Container, Button, Form, FormGroup, Input, Alert } from "reactstrap";


export default function Register({ history }) {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")

    const [ error, setError ] = useState(false)
    const [ errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async evt => {
        evt.preventDefault();

        if(email !== "" && password !== "" && firstName !== "" && lastName !== ""){
            console.log(firstName, lastName, email, password)

            const response = await api.post('/user/register', {firstName, lastName, email, password})
            const userId = response.data._id || false

            if(userId){
                localStorage.setItem('user', userId)
                history.push('/dashboard')
            }else{
                const {message} = response.data
                setError(true)
                setErrorMessage(message)
                setTimeout(() => {
                setError(false)
                setErrorMessage("")
            }, 4000)
                console.log(message)
        }
        }else{
            setError(true)
            setErrorMessage("Required field missing")
            setTimeout(() => {
                setError(false)
                setErrorMessage("")
            }, 4000)
        }
    }


	return(
        <Container>
            <h2>Register</h2>
            <p>Please <strong>Register</strong> a new account</p>
            <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" name="firstName" id="firstName" placeholder="Your first Name" onChange={evt => setFirstName(evt.target.value)} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" name="lastName" id="lastName" placeholder="Your last Name" onChange={evt => setLastName(evt.target.value)} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="email" name="email" id="email" placeholder="Your email" onChange={evt => setEmail(evt.target.value)} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="password" name="password" id="password" placeholder="Your password" onChange={evt => setPassword(evt.target.value)} />
            </FormGroup>
            <FormGroup>
                <Button className="submit-btn">Submit</Button>
            </FormGroup>
            <FormGroup>
                <Button className="secondary-btn" onClick={() => history.push("/login")}>Login</Button>
            </FormGroup>
        </Form>
        {error ? (
                <Alert className="login-validation" color="danger">{errorMessage}</Alert>
            ): ""}
        </Container>
    );
}
