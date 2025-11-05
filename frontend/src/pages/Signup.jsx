import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
  };

  const formContainerStyle = {
    backgroundColor: '#ffffff',
    padding: '50px 60px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '480px',
    textAlign: 'center',
    border: '1px solid #e1e8ed',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  };

  const headingStyle = {
    color: '#1a1a1a',
    marginBottom: '35px',
    fontSize: '2.5em',
    fontWeight: '600',
    letterSpacing: '-0.5px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const inputStyle = {
    width: 'calc(100% - 24px)',
    padding: '14px 12px',
    border: '1px solid #ccd6dd',
    borderRadius: '10px',
    fontSize: '1.1em',
    backgroundColor: '#f8f9fa',
    transition: 'all 0.3s ease',
  };

  const buttonStyle = {
    width: '100%',
    padding: '15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.2em',
    fontWeight: '700',
    cursor: 'pointer',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={headingStyle}>Sign Up</h2>
        <form
          style={formStyle}
          onSubmit={(e) => {
            e.preventDefault();
            nav("/login");
          }}
        >
          <input
            style={inputStyle}
            placeholder="Name"
            required
            // Add onFocus and onBlur for hover-like effects if needed
          />
          <input
            style={inputStyle}
            placeholder="Email"
            type="email"
            required
          />
          <input
            style={inputStyle}
            placeholder="Phone"
            required
          />
          <input
            style={inputStyle}
            placeholder="Password"
            type="password"
            required
          />
          <button
            style={buttonStyle}
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}