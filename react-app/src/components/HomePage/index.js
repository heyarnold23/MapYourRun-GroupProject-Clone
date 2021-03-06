import React from 'react'
import "./HomePage.css"
import Splash1 from "./public/splash1.png"
import Splash2 from "./public/splash2.png"
import splash2Overlay from "./public/splashOverlay.png"
import Splash3 from "./public/splash3.png"
import Splash4 from "./public/splash4.png"
import Splash4Overlay from "./public/splash4Overlay.png"
import Splash5 from "./public/splash5.png"

const HomePage = () => {



    return (
        <div className='mainDiv'>
          <div className="splash_1_div">
            <img src={Splash1} alt="running peeps"></img>
            <div className="heading_text1">
              <h2>
                <hr className="bar1"></hr>
                <span id="title_1">Own Every Mile</span>
                <hr className="bar1"></hr>
              </h2>
                <p id="p1">The best mobile run tracking experience, <br />
                   backed by the world's largest digital <br />
                   health and fitness community.
                </p>

            </div>
          </div>
          <div className="splash_2_div">
            <div className="splash2_wrapper"></div>
            <div className="heading_2_wrapper">
            <img src={Splash2} id="splash2" alt="grid map"></img>
            <img src={splash2Overlay} id="overlay_img" alt="shoe"></img>
            </div>
          </div>
          
          <div className="splash_3_div">
            <div className="app_text_wrapper">
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
              <h2>Train Smarter</h2>
              <p>Analyze your data in the app or on the web, then conquer
                 that 5K or marathon using our adaptive training plans.</p>
            </div>
            <img src={Splash3} id="splash_3" alt="application example"></img>
          </div>
          <div id="overlap_div">
            <div className="heading_text3">
              <h2>
                <hr className="bar3"></hr>
                <span>Find Your Path Anywhere</span>
                <hr className="bar3"></hr>
              </h2>
            </div>
            <p className="subheading">
              <span>
              Create and discover new routes wherever <br />
               you are. Save your favorites for the next <br />
                time you're ready to run.
              </span>
            </p>
            <div className="cities">
              <ul className="city_column">
                <li className="city">
                  <a href="https://www.youtube.com/watch?v=rTVjnBo96Ug" className="city">
                    San Francisco
                  </a>
                </li>
                <li className="city">
                  <a href="https://www.youtube.com/watch?v=s73uAfRSTOw" className="city">
                    New York
                  </a>
                </li>
                <li className="city">
                  <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" className="city">
                    Los Angeles
                  </a>
                </li>
              </ul>
            </div>
            <div className="splash_4_div">
              <img src={Splash4} className="map_img" alt="map"></img>
              <img src={Splash4Overlay} id="overlay4_img" alt="city run example"></img>
            </div>
            <div className="splash_5_div">
            <img src={Splash5} alt="2021 is your year"></img>

            </div>
          </div>
        </div>

    )
}

export default HomePage;
