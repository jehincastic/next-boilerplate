import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { LockOutlined, DraftsOutlined } from "@mui/icons-material";

import { useAuth } from "@providers/AuthProvider";
import signUpSchema from "@schemas/signup";
import { AlertContext } from "@providers/AlertProvider";
import fetcher from "@utils/fetcher";
import { SignUpInput } from "@interfaces/index";
import DynamicForm from "@components/DynamicForm";
import signupForm from "@config/forms/signup";
import Layout from "@components/Layout";
import withNavBar from "@hocs/withNavBar";
import routes from "@config/router";

type SignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  agreeToTerms: boolean;
};

const ConfirmScreen: React.FC<{ email: string }> = ({ email }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DraftsOutlined sx={{ fontSize: "200px" }} />
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          Email Confirmation
        </Typography>
        <Typography
          component="text"
          variant="body1"
          sx={{
            textAlign: "center",
          }}
        >
          We have sent email to <span style={{ fontWeight: 700 }}>{email}</span> to confirm your identity.
          After receving the email follow the link provided to complete the registration.
        </Typography>
      </Box>
    </Container>
  );
};

const Signup: NextPage = () => {
  const [userEmail, setEmail] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const { user } = useAuth();
  const { setAlertInfo } = useContext(AlertContext);
  const router = useRouter();

  useEffect(() => {
    if (user.loggedIn) {
      router.push(routes.homePage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const signUpFn = async (formVal: SignUpForm) => {
    if (formVal.agreeToTerms) {
      const input: SignUpInput = {
        firstName: formVal.firstName,
        lastName: formVal.lastName,
        email: formVal.email,
        password: formVal.password,
        phone: formVal.phone,
      };
      const response = await fetcher<SignUpInput, string>(
        routes.api.signup,
        "POST",
        input,
      );
      if (response.status === "FAILED") {
        setAlertInfo({
          msg: response.data,
          severity: "error",
        });
      } else {
        // Handle Success Case
        setEmail(formVal.email);
        setSignedUp(true);
      }
      return true;
    }
    setAlertInfo({
      msg: "Please accept the terms and conditions.",
      severity: "error",
    });
    return false;
  };

  return (
    signedUp
      ? <ConfirmScreen email={userEmail} />
      : (
        <Layout loading={user.loading} loadingText="Fetching Info..." showChildOnLoading>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <DynamicForm<SignUpForm>
                submit={async (values, actions) => {
                  const val = await signUpFn(values);
                  actions.setSubmitting(false);
                  return val;
                }}
                initialValues={{
                  email: "",
                  firstName: "",
                  lastName: "",
                  password: "",
                  phone: "",
                  agreeToTerms: false,
                }}
                schema={signUpSchema}
                buttonText="Sign Up"
                fields={signupForm}
              />
              <Grid
                container
                justifyContent="flex-end"
                sx={{
                  my: 2,
                }}
              >
                <Grid item>
                  <NextLink href={routes.loginPage} passHref>
                    <Link variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </NextLink>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Layout>
      )
  );
};

export default withNavBar(Signup);
