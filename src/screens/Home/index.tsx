import React from "react";
import { View, Text } from "react-native";

import NewsList from "../../components/NewsList";
import Header from "../../components/Header";
import AlertForm from "../../components/AlertForm";
import PanicButton from "../../components/PanicButton";
import Footer from "../../components/Footer";
export default function Home() {
  return (
    <View>
      <Header />
      <NewsList />
      <AlertForm />
      <PanicButton />
      <Footer />
    </View>
  );
}
