import "./Notfound.scss";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="notfound flex flex-col items-center justify-center">
      <h1>404 - Page Not Found</h1>
      <p>The requested page does not exist.</p>

      <Link className="main-btn mt-3" to="/">
        Go back Home
      </Link>
    </div>
  );
};

export default NotFound;
