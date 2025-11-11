import '../../styles/WelcomeFooter.css'

export default function WelcomeFooter() {
  return (
    <footer className="welcome-footer">
      <div className="footer-container">
        <p className="footer-text">© {new Date().getFullYear()} Company</p>
      </div>
    </footer>
  )
}
