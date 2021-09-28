import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


test('Check for page logo on landing page', () => {
    render(<App />);

    const image = screen.getByAltText('Shop Logo');

    expect(image).toHaveAttribute('src', 'logo.png')
});

test('Click the Sign In/Track Order link and check for correct page title', () => {
    render(<App />);

    const link = screen.getByText('Sign In/Track Order');

    fireEvent.click(link);

    //change http://localhost to actual url when testing on web
    expect(window.location.href).toBe("http://localhost/login");

    render(<legend></legend>);

    const txt = screen.getByText('Login');
    expect(txt.innerHTML).toEqual('Login');
});

test('Click the Favorites link and check for the correct page title', () => {
    render(<App />);

    //this link renders the heart emoji \f004
    const link = screen.getByLabelText('Favorites');

    fireEvent.click(link);

    //change http://localhost to actual url when testing on web
    expect(window.location.href).toBe("http://localhost/favorites");

    //this will make current page pass
    //const txt = screen.getByText('This is the favorites page!');
    //expect(txt.innerHTML).toEqual('This is the favorites page!');
    //expected title	
    const txt = screen.getByText('Favorites');
    expect(txt.innerHTML).toEqual('Favorites!');

});

test('Click the Cart link and check for correct page title', () => {
    render(<App />);

    //this link renders the cart emoji \f07a
    const link = screen.getByLabelText('Shopping Cart');

    fireEvent.click(link);

    //change http://localhost to actual url when testing on web
    expect(window.location.href).toBe("http://localhost/cart");

    //change this to the correct page title when added
    //const txt = screen.getByText('This is the cart page!');
    //expect(txt.innerHTML).toEqual('This is the cart page!');
    //expected title
    const txt = screen.getByText('Shopping Cart');
    expect(txt.innerHTML).toEqual('Shopping Cart');
});
