
const Footer = () => {
  return (
    <footer >
      
      <div className="footer">
      <div className="footer-column">
        <h1>LuxT.</h1>
      </div>
      <div className="footer-column">
        <h3>Follow us on social media </h3>
        <ul className="social-icons">
          <li><a href="https://twitter.com"><i className="bi bi-twitter"></i></a></li>
          <li><a href="https://facebook.com"><i className="bi bi-facebook"></i></a></li>
            <li><a href="https://instagram.com"><i className="bi bi-instagram"></i></a></li>
            <li><a href="https://linkedin.com"><i className="bi bi-linkedin"></i></a></li>
            <li><a href="https://youtube.com"><i className="bi bi-youtube"></i></a></li>

        </ul>
      </div>
      <div className="footer-column">
        <h3>Subscribe to our newsletter </h3>
        <form className="newsletter-form">
          <input type="email" placeholder="Your email address" />
          <button type="submit">Subscribe</button>
        </form>
        </div>
    </div>
        <div className="footer-bottom">
        <p>&copy; 2024 | Luxury Travel | All Rights Reserved</p>
        </div>
    </footer>    
  );
};

export default Footer;
