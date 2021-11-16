const Display = ({ auth }) => {
  return <div>{auth ? "Voce logou!" : "Login errado!"}</div>;
};

export default Display;
