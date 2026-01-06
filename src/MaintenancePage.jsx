const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '2rem',
  backgroundColor: '#f5f7fb',
  color: '#1f2a44',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
};

const cardStyle = {
  maxWidth: '520px',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 15px 35px rgba(31, 42, 68, 0.15)',
  padding: '3rem 2.5rem'
};

const headingStyle = {
  fontSize: '2rem',
  marginBottom: '1rem'
};

const textStyle = {
  fontSize: '1rem',
  lineHeight: 1.6,
  marginBottom: '0.5rem'
};

const MaintenancePage = () => (
  <main style={containerStyle}>
    <section style={cardStyle}>
      <h1 style={headingStyle}>We&apos;ll Be Right Back</h1>
      <p style={textStyle}>
        Our website is currently undergoing scheduled maintenance to improve your
        experience.
      </p>
      <p style={textStyle}>Thanks for your patience—please check back soon.</p>
    </section>
  </main>
);

export default MaintenancePage;

