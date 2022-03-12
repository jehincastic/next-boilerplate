import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Theme } from "@mui/material";
import Typography from "@mui/material/Typography";

import fetcher from "@utils/fetcher";
import { LoginResponse, JWTInfo } from "@interfaces/index";
import { AlertContext } from "@providers/AlertProvider";
import { getDefaultProfileImg } from "@utils/index";
import routes from "@config/router";

interface AuthCtxType {
  user: JWTInfo & { loading: boolean; loggedIn: boolean };
  setUser: React.Dispatch<React.SetStateAction<JWTInfo & {
    loggedIn: boolean;
    loading: boolean;
  }>>;
}

const authContext = createContext<AuthCtxType>({
  user: {
    loggedIn: false,
    email: "",
    emailVerified: false,
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    image: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    loading: true,
  },
  setUser: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {
        auth.user.loading
          ? (
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
                display: "flex",
                flexDirection: "column",
              }}
              open
            >
              <CircularProgress color="inherit" />
              <Typography sx={{ mt: 3 }} variant="h6" gutterBottom component="div">
                LOADING
              </Typography>
            </Backdrop>
          ) : children
      }
    </authContext.Provider>
  );
};

const useProvideAuth = () => {
  const [user, setUser] = useState<JWTInfo & { loggedIn: boolean; loading: boolean }>({
    loggedIn: false,
    email: "",
    emailVerified: false,
    id: "",
    firstName: "",
    lastName: "",
    image: "",
    phone: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    loading: true,
  });
  const { setAlertInfo } = useContext(AlertContext);

  const fetchUserInfo = async () => {
    const response = await fetcher<any, LoginResponse>(
      routes.api.me,
      "POST",
      {},
    );
    if (response.status === "SUCCESS") {
      const {
        user: fetchedUser,
      } = response.data as LoginResponse;
      if (!fetchedUser.image) {
        fetchedUser.image = getDefaultProfileImg(`${fetchedUser.firstName} ${fetchedUser.lastName}`);
      }
      setUser({
        ...fetchedUser,
        loggedIn: true,
        loading: false,
      });
    } else {
      if (response.data === "Network Called Failed") {
        setAlertInfo({
          msg: response.data,
          severity: "error",
        });
      } else {
        localStorage.removeItem(process.env.tokenKey || "");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(process.env.tokenKey || "");
    if (token) {
      fetchUserInfo()
        .catch(() => {
          setUser({
            ...user,
            loading: false,
          });
        });
    } else {
      setUser({
        ...user,
        loading: false,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    setUser,
  };
};

export const useAuth = () => useContext(authContext);
