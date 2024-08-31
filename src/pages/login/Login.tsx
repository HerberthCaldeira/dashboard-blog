import React, { useState } from "react";
import { useAuth } from "../../actions/auth/useAuth";
import { credentials } from "../../actions/auth/types";

function Login() {
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [data, setData] = useState<credentials>({
    email: "teste@teste.io",
    password: "password",
  });

  const handlerSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(data);
  };

  return (
    <>
      <div>Login</div>
      email:
      <input
        value={data.email}
        onChange={(e) =>
          setData((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      password:{" "}
      <input
        value={data.password}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
      />
      <button type="button" onClick={handlerSubmit}>
        Login
      </button>
    </>
  );
}

export default Login;
