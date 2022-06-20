import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '../Header';


test('Check for page logo on Header', () => {
    render(<MemoryRouter>
             <Header />
           </MemoryRouter>
           );

    const image = screen.getByAltText('Shop Logo');

    expect(image).toHaveAttribute('src', 'logo.png')
});

