import { useNavigate } from "react-router-dom";

const goHome = () => {
    const navigate = useNavigate();

    navigate("/");
    window.location.reload(); // force refresh
};

export default goHome;