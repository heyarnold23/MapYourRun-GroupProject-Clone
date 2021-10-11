import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import { NavLink } from 'react-router-dom'
import "./HomePage.css"
import Splash1 from "./public/splash1.png"
import Splash2 from "./public/splash2.png"
import Overlay from "./public/splashOverlay.png"
import Splash3 from "./public/splash3.png"

const HomePage = () => {

    return (
        <div>
          <div className="splash_1_div">
          <img src={Splash1}></img>
          </div>
          <div className="splash_2_div">
          <img src={Splash2}></img>
          <img src={Overlay} id="overlay_img"></img>
          </div>
          <div className="splash_3_div">
            <div className="app_text_wrapper">
              <div>
                <div>
                    <h2>Track Everything</h2>
                    <p>Log any kind of workout using just
                      your phone or with your favorite
                      device like Garmin or Apple Watch.
                    </p>
                  </div>
                  <div>
                    <h2>Get Social</h2>
                    <p>Find support and motivation from other runners,
                      plus create challenges for you and your friends.</p>
                  </div>
                  <div>
                    <h2>Train Smarter</h2>
                    <p>Analyze your data in the app or on the web, then conquer
                      that 5K or marathon using our adaptive training plans.</p>
                  </div>
                </div>
                <div>
                <img src={Splash3} id="splash_3"></img>
              </div>
            </div>
          </div>
        </div>
        
    )
}

export default HomePage;
