import { useAuth } from "../../actions/auth/useAuth";
import { credentials } from "../../actions/auth/types";
import { Button } from "@/components/ui/button";

import { zodSchema } from "./zodSchema";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormProvider } from "react-hook-form";
import MyInput from "../../components/my/form/inputFields/MyInput";
import useMyForm from "@/components/my/form/react-hook-form";

export default function Login() {
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const transformFn = (data: credentials): any => {
    return {
      email: data.email,
      password: data.password,
    };
  };

  const { formMethods, onSubmit, errors } = useMyForm({
    schema: zodSchema,
    transformFn,
    mutationFn: login,
    mutationOptions: {
      onSuccess: (data, variables, context) => {},
    },
    defaultValues: {
      email: "teste@teste.io",
      password: "password",
    },
  });

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <FormProvider {...formMethods}>
          <form onSubmit={onSubmit}>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Deploy your new project in one-click.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MyInput
                  name={"email"}
                  label={"email"}
                  type={"text"}
                  errors={errors}
                />

                <MyInput
                  name={"password"}
                  label={"Password"}
                  type={"text"}
                  errors={errors}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" className={"disabled:bg-white"}>
                  Login
                </Button>
              </CardFooter>
            </Card>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
