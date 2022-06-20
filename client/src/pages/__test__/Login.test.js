import { MemoryRouter } from "react-router-dom";
import { render, act, screen, fireEvent, getByText, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import Login from '../Login';

//TODO:Fix tests passing no matter what.  This seems to have something to do with setTimeout, but so far haven't been able to
//get tests to conditionally succeed or fail based on expect content.
//jest.useFakeTimers();
//jest.spyOn(global, 'setTimeout');

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

function doAsync(c) {
    setTimeout(() => {
        const txt = screen.getByTestId('alert');
        
	console.log("txt: " + txt.innerHTML);
        c(txt.innerHTML);
        //reactTest
        //expect(txt.innerHTML).toBe("Invalid pasword.");
        //jest-dom
        //expect(txt.innerHTML).toHaveTextContent("Invalid password.");

    }, 1000);
}

test('Click the Sign In/Track Order link and login with incorrect password', () => {
    console.log("incorrect password test!")
    render(<MemoryRouter>
             <Login />
           </MemoryRouter>);

    expect.assertions(0);
    function callback(data) {
        expect(data).toHaveTextContent("Invalid password.");
    }

    const userIn = screen.getByLabelText('Username:', {selector: 'input'});
    userEvent.type(userIn, "alice");

    const passIn = screen.getByLabelText('Password:', {selector: 'input'});
    userEvent.type(passIn, "password");
    //click Submit

    const btn = waitFor(async () => await screen.getByTestId('submit-reg'));
    //fireEvent.click(btn);
    waitFor(async () => await fireEvent.click(btn));

    console.log("3. Enter timeout:")
    
    doAsync(callback);
    jest.runAllTimers();
    /*
    setTimeout(() => {
        txt = screen.getByTestId('alert');
        
	console.log("txt: " + txt.innerHTML);
        //reactTest
        //expect(txt.innerHTML).toBe("Invalid pasword.");
        //jest-dom
        //expect(txt.innerHTML).toHaveTextContent("Invalid password.");

    }, 200);
    */
    //expect(setTimeout).toHaveBeenCalledTimes(5);

    //expect(txt.innerHTML).toHaveTextContent("Invalid password.");
     
});

test('Click the Sign In/Track Order link and login with incorrect username', () => {
    let user = "asdghgkj";
    let pass = "abcabc";

    render(<MemoryRouter>
             <Login />
           </MemoryRouter>);

    const userIn = screen.getByLabelText('Username:', {selector: 'input'});
    userEvent.type(userIn, user);
    //console.log("userIn value: " + userIn.value)
    //expect(userIn.value).toBe(user);

    const passIn = screen.getByLabelText('Password:', {selector: 'input'});
    userEvent.type(passIn, pass);
    //console.log("passIn value: " + passIn.value)
    //expect(passIn.value).toBe(pass);

    //click Submit
    //const container = document.querySelector('#submit-reg');
    //const btn = getByText(container, 'Login');
    const btn =  waitFor(async () => await screen.getByTestId('submit-reg'));
    //expect(setTimeout).toHaveBeenCalledTimes(2);
    //fireEvent.click(btn);
    waitFor(async () => await fireEvent.click(btn));

    setTimeout(() => {
        //Invalid password.
        const txt = screen.getByTestId('alert');
        //const txt = screen.getByRole('alert');
        expect(txt.innerHTML).toBe('User not found.');
     }, 500);

    jest.runAllTimers();
});


test('Click the Sign In/Track Order link and login with correct info', () => {
    let user = "alice";
    let pass = "password123";

    //render(<Login />);

    render(<MemoryRouter>
             <Login />
           </MemoryRouter>);

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
        const txt = screen.getByLabelText('Shop all sales!');
        //const txt = screen.getByRole('alert');
        //expect(txt.textContent).toEqual('Shop all sales!');

     }, 500);
        
});
