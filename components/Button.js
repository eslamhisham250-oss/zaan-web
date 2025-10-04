// components/Button.js
export default function Button({children, onClick, type="button", color="primary"}){
  const styles = {
    padding:'10px 16px',
    borderRadius:8,
    border:'none',
    cursor:'pointer',
    fontWeight:600
  };

  if(color==="primary") {
    styles.background='#0a7'; styles.color='#fff';
  }
  if(color==="danger") {
    styles.background='#e11'; styles.color='#fff';
  }

  return (
    <button type={type} onClick={onClick} style={styles}>
      {children}
    </button>
  );
}