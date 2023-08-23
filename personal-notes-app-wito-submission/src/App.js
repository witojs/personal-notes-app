import React from "react";
import Navigation from "./components/1Navigation";
import { Routes, Route, Link } from "react-router-dom";
import AddPage from "./pages/AddPage";
import HomePage from "./pages/HomePage";
import ArchivePage from "./pages/ArchivePage";
import DetailPageWrapper from "./pages/DetailPage";
import NotFoundPage from "./pages/404Page";
import ToggleTheme from "./components/10ToggleTheme";
import { ThemeProvider } from "./contexts/ThemeContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import { FiLogOut } from "react-icons/fi";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem("theme") || "dark",
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === "dark" ? "light" : "dark";
          localStorage.setItem("theme", newTheme);
          return {
            theme: newTheme,
          };
        });
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState(() => {
      // console.log("rendering App Page");
      return {
        authedUser: data,
        initializing: false,
      };
    });
    document.documentElement.setAttribute("data-theme", this.state.theme);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
    // console.log("berhasil login");
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });

    putAccessToken("");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <ThemeProvider value={this.state}>
          <div className="app-container">
            <header>
              <h1>
                <Link to="/">Aplikasi Catatan</Link>
              </h1>
              <Navigation />
              <ToggleTheme />
            </header>
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider value={this.state}>
        <div className="app-container">
          <header>
            <h1>
              <Link to="/">Aplikasi Catatan</Link>
            </h1>
            <Navigation />
            <ToggleTheme />
            <button
              className="button-logout"
              title="Keluar"
              onClick={this.onLogout}
            >
              {this.state.authedUser.name}
              <FiLogOut />
            </button>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/notes/new" element={<AddPage />} />
              <Route path="/archive" element={<ArchivePage />} />
              <Route path="notes/:id" element={<DetailPageWrapper />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
