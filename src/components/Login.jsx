import { useState, useEffect } from "react";
 import {
   Col,
   Form,
   FormGroup,
   Input,
   Label,
   Row,
   FormFeedback,
   Button,
 } from "reactstrap";
 
 import { useHistory } from "react-router-dom"; // Import useHistory for navigation
 
 const initialState = {
   email: "",
   password: "",
   terms: false,
 };
 
 const errorMessages = {
   email: "Please enter a valid email address",
   password: "Password must be at least 4 characters long",
   terms: "You must accept the terms",
 };
 
 export default function Login() {
   const [form, setForm] = useState(initialState);
   const [isValid, setIsValid] = useState(false);
   const [errors, setErrors] = useState({});
   const history = useHistory();
 
   function isValidEmail(email) {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return emailRegex.test(email);
   }
 
   const handleChange = (event) => {
     let { name, value, type, checked } = event.target;
     value = type === "checkbox" ? checked : value;
     const newForm = { ...form, [name]: value };
     setForm(newForm);
 
     if (name === "email") {
       if (isValidEmail(value)) {
         setErrors({ ...errors, [name]: false });
       } else {
         setErrors({ ...errors, [name]: true });
       }
     }
 
     if (name === "password") {
       setErrors({ ...errors, [name]: value.trim().length < 4 });
     }
 
     if (name === "terms") {
       setErrors({ ...errors, [name]: !checked });
     }
   };
 
   useEffect(() => {
     const isFormValid =
       isValidEmail(form.email) &&
       form.password.trim().length >= 4 &&
       form.terms;
     setIsValid(isFormValid);
   }, [form]);
 
   const handleSubmit = (event) => {
     event.preventDefault();
 
     if (isValid) {
       history.push("/home");
     }
   };
 
   return (
     <Form className="form" onSubmit={handleSubmit}>
       <Row>
         <Col>
           <h1>Login</h1>
         </Col>
       </Row>
       <Col>
         <FormGroup>
           <Label for="exampleEmail">Email</Label>
           <Input
             id="exampleEmail"
             name="email"
             placeholder="with a placeholder"
             type="email"
             value={form.email}
             onChange={handleChange}
             invalid={!!errors.email}
           />
           {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
         </FormGroup>
       </Col>
       <Col md={6}>
         <FormGroup>
           <Label for="examplePassword">Password</Label>
           <Input
             id="examplePassword"
             name="password"
             placeholder="Lütfen Şifre Giriniz"
             type="password"
             value={form.password}
             onChange={handleChange}
             invalid={!!errors.password} // Mark input as invalid if there's an error
           />
           {errors.password && (
             <FormFeedback>{errorMessages.password}</FormFeedback>
           )}
         </FormGroup>
         <FormGroup check>
           <Input
             id="exampleCheck"
             name="terms"
             type="checkbox"
             checked={form.terms}
             onChange={handleChange}
             invalid={!!errors.terms}
           />
           <Label check for="exampleCheck">
             Check me out
           </Label>
           {errors.terms && <FormFeedback>{errorMessages.terms}</FormFeedback>}
         </FormGroup>
         <FormGroup className="text-center p-4">
           <Button disabled={!isValid} color="primary">
             Sign In
           </Button>
         </FormGroup>
       </Col>
     </Form>
   );
 }