//Code in this file from https://javascript.plainenglish.io/testing-react-apps-that-use-react-router-ea86377db1c8

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// create a customRender that wraps the UI in a memory Router
const memRender = (ui, options) => {
  return render(ui, { wrapper: MemoryRouter, ...options });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { memRender as render };

