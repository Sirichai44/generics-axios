# generics-axios

`generics-axios` is a custom hook for Axios with generics support. It simplifies the use of Axios requests by providing type-safe API calls with TypeScript.

## Features V1.1.4beta

- **Context-based defaults**: Automatically uses default headers, error, and response values configured via `AxiosProvider`.
- **Error Handling**: Provides structured error handling using Axios' `AxiosError` type.
- **Type-Safe API**: Ensures type safety for response data and error responses.
- **Customizable**: Allows customizing the default values (e.g., headers, error messages, etc.) through the context.
- **Flexibility**: Can be used both in React components and non-React services.

## Installation

```bash
npm install generics-axios
yarn add generics-axios
bun add generics-axios
```

## Set up and Usage
1. Setting Up AxiosProvider
```tsx
// App.tsx or your main entry component
import React from 'react';
import { AxiosProvider } from 'generics-axios';
import { AppContent } from './AppContent';

const App = () => {
  const defaults = {
    defaultReturn: { status: '', status: '' },  // Default return when no data
    defaultError: { message: 'An error occurred' },  // Default error response
    headerDefault: { 'Authorization': 'Bearer token' }  // Default headers
  };

  return (
    <AxiosProvider defaults={defaults}>
      <AppContent />
    </AxiosProvider>
  );
};

export default App;
```

## Using useAxios in React Components
```tsx
  import { isAxiosError } from "axios";

const Main = () => {
  const { execute } = useAxios<'GET', 'DEFAULT'>(
    { method: 'GET', url: 'https://jsonplaceholder.typicode.com/todos/1' },
    true // Use default return value
  );

  const fetchData = async () => {
    const res = await execute()

    if(isAxiosError(res)) {
      const error = res.response.data.error
    } else {
      console.log(res)
    }
  }
}

export default Main
```

## Using axiosService in Services (Non-React Context)
```tsx
export const fetchData = async () => {
  const config = {
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
  };

  const { execute } = await axiosService(config);
  return execute();
};
```
