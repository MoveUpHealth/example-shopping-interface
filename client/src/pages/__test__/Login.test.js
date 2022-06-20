import {render} from "./test-utils";
import { act, screen, fireEvent, getByText, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import Login from '../Login';


/*
Precondition: database user collection has following document:

{
	"firstname": "Alice"
	"lastname": "Smith"
	"email": "alice@email.com"
	"username": "alice"
	"password":"password123"
}


*/
test('Click the Sign In/Track Order link and login with incorrect password', () => {
    console.log("incorrect password test!")
    render(<Login />);

    const userIn = screen.getByLabelText('Username:');
    userEvent.type(userIn, "alice");

    const passIn = screen.getByLabelText('Password:');
    userEvent.type(passIn, "password");
    //click Submit

    const btn = waitFor(async () => await screen.getByTestId('submit-reg'));

    //fireEvent.click(btn);
    waitFor(async () => await fireEvent.click(btn));

    setTimeout(() => {
        const txt = screen.getByTestId('alert');
        
	console.log("txt: " + txt.innerHTML);
        //reactTest
        //expect(txt.innerHTML).toBe("Invalid pasword.");
        //jest-dom
        expect(txt.innerHTML).toHaveTextContent("Invalid password.");

    }, 200);


     
});

test('Click the Sign In/Track Order link and login with incorrect username', () => {
    let user = "asdghgkj";
    let pass = "abcabc";

    render(<Login />);

    const userIn = screen.getByLabelText('Username:');
    userEvent.type(userIn, user);
    //console.log("userIn value: " + userIn.value)
    //expect(userIn.value).toBe(user);

    const passIn = screen.getByLabelText('Password:');
    userEvent.type(passIn, pass);
    //console.log("passIn value: " + passIn.value)
    //expect(passIn.value).toBe(pass);

    //click Submit
    //const container = document.querySelector('#submit-reg');
    //const btn = getByText(container, 'Login');
    const btn =  waitFor(async () => await screen.getByTestId('submit-reg'));
    //fireEvent.click(btn);
    waitFor(async () => await fireEvent.click(btn));

    setTimeout(() => {
        //Invalid password.
        //TODO:figure out why the alert element isn't rendering on page after the fireEvent.click() is called
        const txt = screen.getByTestId('alert');
        //const txt = screen.getByRole('alert');
        expect(txt.innerHTML).toBe('User not found.');
     }, 500);
});
