import { useState } from "react";
import Product from "./components/ui/Product";
import Login from "./components/ui/pages/login";

function App() {
  const [session, setSession] = useState<string | null>(null);

  return (
    <main className="flex min-h-screen flex-col gap-4">
      {session ? (
        <Product setSession={setSession} />
      ) : (
        <Login setSession={setSession} />
      )}
    </main>
  );
}

export default App;
