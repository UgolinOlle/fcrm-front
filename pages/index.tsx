import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import {
  BaseStyles,
  Box,
  Button,
  Flash,
  FormControl,
  TextInput,
} from "@primer/react";

import { AppDispatch } from "@/store/store";
import { authLogin } from "@/store/auth/actions";
import { selectError } from "@/store/auth/selectors";

export default function Home() {
  const router = useRouter();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const error = useSelector(selectError);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const authRes = await dispatch(
      authLogin({ email: mail, password: password })
    );
    const res = unwrapResult(authRes);

    if (res.accessToken) {
      await localStorage.setItem("accessToken", res.accessToken);
      await router.push("/dashboard");
    }
  };

  return (
    <BaseStyles>
      <Box className="d-flex flex-column width-full height-full flex-justify-center flex-items-center">
        <img src="/fcrm-dark.png" width={400} height={400} alt="FCRM logo" />
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column flex-justify-center flex-items-center"
        >
          <FormControl
            sx={{ display: "flex", flexDirection: "column", margin: "2rem" }}
          >
            <FormControl.Label>Email</FormControl.Label>
            <TextInput
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </FormControl>
          <FormControl sx={{ display: "flex", flexDirection: "column" }}>
            <FormControl.Label>Password</FormControl.Label>
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            variant="primary"
            size="large"
            sx={{ marginTop: "2rem", fontSize: "1rem" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </BaseStyles>
  );
}
