"use client";

import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase-client";
import { setAuthCookie } from "../actions/auth-actions";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) {
      router.push("/admin/dashboard");
    }
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      router.push("/admin/dashboard");
    }

    const unsubscribeAuthState = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setAuthCookie(token);
        router.push("/admin/dashboard");
      }
    });

    const unsubscribeTokenChange = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setAuthCookie(token);
      }
    });

    return () => {
      unsubscribeAuthState();
      unsubscribeTokenChange();
    };
  }, [router]);

  const submit = (values: LoginFormValues) => {
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        try {
          const user = await signInWithEmailAndPassword(auth, values.email, values.password);
        } catch (error: any) {
          const errorMessage = error.message;
          setLoginError(errorMessage);
        }
      })
      .catch((error: any) => {
        const errorMessage = error.message;
        setLoginError(errorMessage);
      });
  };

  return (
    <div className="w-full h-1/2 max-w-md mx-auto mt-20">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          submit(values);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Field as={Input} id="email" name="email" type="email" placeholder="you@example.com" />
                {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Field as={Input} id="password" name="password" type="password" />
                {errors.password && touched.password && <div className="text-red-500 text-sm">{errors.password}</div>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            </CardFooter>
            {loginError && (
              <CardFooter>
                <div className="text-red-500 text-sm">{beautifyError(loginError)}</div>
              </CardFooter>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

const beautifyError = (error: string) => {
  if (error === "Firebase: Error (auth/invalid-credential).") {
    return "Invalid email or password";
  }
  return error;
};
