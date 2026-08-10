import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./hooks/useTheme";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
