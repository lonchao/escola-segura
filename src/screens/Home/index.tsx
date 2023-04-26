import React, { useEffect, useState } from "react";
import { View } from "react-native";

import NewsList from "../../components/NewsList";
import Header from "../../components/Header";

import Footer from "../../components/Footer";

import AuthValidator from "../../components/AuthValidator";
export default function Home() {
  return (
    <View>
      <Header />
      <NewsList />
      <AuthValidator />

      <Footer />
    </View>
  );
}
