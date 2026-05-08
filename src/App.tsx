import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Home } from "@/pages/Home";
import { RecipeList } from "@/pages/RecipeList";
import { RecipeDetail } from "@/pages/RecipeDetail";
import { CookingPage } from "@/pages/CookingPage";
import { Community } from "@/pages/Community";
import { Progress } from "@/pages/Progress";
import { Profile } from "@/pages/Profile";
import { Login } from "@/pages/Login";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/cooking/:id" element={<CookingPage />} />
            <Route path="/community" element={<Community />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
