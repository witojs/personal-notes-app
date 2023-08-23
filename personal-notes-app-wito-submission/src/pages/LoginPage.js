import React from "react";
import PropTypes from "prop-types";
import LoginInput from "../components/11LoginInput";
import { login } from "../utils/network-data";
import { Link } from "react-router-dom";

function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className="login-page">
      <h2>Yuk, Login untuk menggunakan aplikasi</h2>
      <LoginInput login={onLogin} />
      <p>
        belum punya akun? <Link to="/register">Daftar di sini.</Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
