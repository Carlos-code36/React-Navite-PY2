import React from "react";
import { SafeAreaView, Text,View } from "react-native";
import LoginForm from "../components/Auth/LoginForm";
import UserData from "../components/Auth/UserData";
import useAuth from "../hooks/useAuth";

export default function Account() {
  const {auth} = useAuth();
  return (
    <SafeAreaView>
          <View>{auth ? <UserData /> : <LoginForm />}</View>
    </SafeAreaView>
  );
}