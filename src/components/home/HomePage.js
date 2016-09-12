import React from "react";
import Header from '../common/Header';
import Footer from '../common/Footer';
import MainPage from '../bar/MainPage';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <MainPage />
        <Footer />
      </div>
    );
  }
}

export default HomePage;
