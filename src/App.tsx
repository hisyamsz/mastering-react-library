import { useState } from "react";
import Product from "./components/ui/Product";

function App() {
  const [session, setSession] = useState<boolean | null>(null);

  return (
    <main className="flex min-h-screen flex-col w-screen">
      {session && <Product />}
      <div>Hello World</div>
    </main>
  );
}

export default App;
