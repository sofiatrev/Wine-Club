import "../styles/LoginPage.css";

export default function LoginPage({ onLogin, onSignUp }) {
  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    }
  };

  const handleSignUp = () => {
    if (onSignUp) {
      onSignUp();
    }
  };

  return (
    <section className="login-page" aria-labelledby="login-title">
      <div className="login-card">
        <p className="login-eyebrow">Login</p>
        <h1 id="login-title" className="login-title">
          Wine Club
        </h1>
        <p className="login-subtitle">Cheers!</p>

        <div className="login-actions">
          <button type="button" className="login-button primary" onClick={handleLogin}>
            Login
          </button>
          <button type="button" className="login-button secondary" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>

        <p className="login-helper">Authentication coming soon.</p>
      </div>
    </section>
  );
}