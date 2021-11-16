import "./styles.css";
import Input from "../Input";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import axios from "axios";

const Login = () => {
  const [token, setToken] = useState("");

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
    axios
      .post("https://kenzieshop.herokuapp.com/sessions/", user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { access, user } = response.data;

        setToken(access);

        localStorage.setItem("@NomeDaAplicação:token", access);
        localStorage.setItem("@NomeDaAplicação:user", JSON.stringify(user));
      })
      .catch((err) => console.log(err));
  };

  return (
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
  );
};

export default Login;
