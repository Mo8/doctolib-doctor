import { Route, Routes } from "react-router-dom";
import Connect from "./pages/Connect";
import Rdvs from "./pages/Rdvs";
import { useEffect, useState } from "react";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  useEffect(() => {
    window.addEventListener(
      "beforeinstallprompt",
      (e) => {
        setDeferredPrompt(e);
      },
      []
    );
  });
  return (
    <div>
      <div>
        {deferredPrompt && (
          <button
            onClick={async () => {
              if (deferredPrompt !== null) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === "accepted") {
                  setDeferredPrompt(null);
                }
              }
            }}
          >
            Install
          </button>
        ) }
      </div>
      <Routes>
        <Route path="/" element={<Connect />} />
        <Route path="/rdvs" element={<Rdvs />} />
      </Routes>
    </div>
  );
}

export default App;
