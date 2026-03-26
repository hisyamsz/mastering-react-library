import { useState } from "react";
import Product from "./components/ui/Product";

function App() {
  const [session, setSession] = useState<string | null>("test");

  return (
    <main className="flex min-h-screen flex-col gap-4">
      {session ? <Product setSession={setSession} /> : <div>Hello World</div>}
    </main>
  );
}

export default App;
