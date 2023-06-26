import LogoutIcon from "@mui/icons-material/Logout";
import "./LogoutWidget.css";
import { useContext } from "react";
import { SessionContext } from "../../Context/SessionContext";

const LogoutWidget = () => {

  const context = useContext(SessionContext)

  const logoutHandler = () => {
    context.logout()
    // mensaje de session closed successfully
  };

  return (
      <LogoutIcon
        fontSize="large"
        sx={{ color: "white" }}
        onClick={logoutHandler}
      />
  );
};

export default LogoutWidget;
