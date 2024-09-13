import React, { useState } from "react";
import { useAuth } from "../../actions/auth/useAuth";
import { credentials } from "../../actions/auth/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodSchema } from "./zodSchema";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import MyInput from "../components/form/fields/MyInput";
import { zodResolver } from "@hookform/resolvers/zod";

function Index() {
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const formMethods = useForm({
    defaultValues: {
      email: "teste@teste.io",
      password: "password",
    },
    resolver: zodResolver(zodSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = formMethods;

  const onSubmit = (data) => {
    login(data, setError);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
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

export default Index;
