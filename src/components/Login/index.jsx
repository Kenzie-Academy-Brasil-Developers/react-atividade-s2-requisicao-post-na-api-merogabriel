import "./styles.css";
import Input from "../Input";
import Display from "../Display";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import axios from "axios";

const Login = () => {
  const [auth, setAuth] = useState(false);
  const [bef, setBef] = useState(true);

  const schema = yup.object().shape({
    username: yup.string().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignIn = (user) => {
    setBef(false);

    axios
      .post("https://kenzieshop.herokuapp.com/sessions/", user)
      .then((response) => {
        const { access } = response.data;
        setAuth(true);
        window.localStorage.clear();
        window.localStorage.setItem("@NomeDaAplicação:token", access);
      })
      .catch((err) => setAuth(false));
  };

  return (
    <div>
      {bef ? (
        <div>
          Login
          <form onSubmit={handleSubmit(handleSignIn)}>
            <Input
              placeholder="Seu username"
              register={register}
              name="username"
              error={errors.email?.message}
            />
            <Input
              placeholder="Sua senha"
              register={register}
              name="password"
              type="password"
              error={errors.password?.message}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <Display auth={auth}></Display>
      )}
    </div>
  );
};

export default Login;
