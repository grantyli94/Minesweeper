const GITHUB = "https://github.com/grantyli94";
const LINKEDIN = "https://www.linkedin.com/in/grant-li-b097a66b/";
const EMAIL = "mailto:grantyli94@gmail.com"

function Footer() {

  return (
    <footer className="Footer">
      <div className="Footer-Text">
        <span>
          <a href={GITHUB}>GitHub</a> | 
          <a href={LINKEDIN}> LinkedIn</a> | 
          <a href={EMAIL}> Email</a></span>
      </div>
    </footer>
  );
}

export default Footer;