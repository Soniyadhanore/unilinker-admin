import React from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { Rating } from "primereact/rating";
import CompaniesLogo from "../../assets/images/structure/CompaniesLogo.svg";
import CompaniesLogo1 from "../../assets/images/structure/CompaniesLogo1.svg";
import CompaniesLogo3 from "../../assets/images/structure/CompaniesLogo2.svg";

const PastJobReview = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="review-box mb-5">
      <Container fluid>
        <Slider {...settings}>
          <div className="review-slide">
            <div className="flex">
              <Rating value={5} readOnly cancel={false} />
              <span className="ml-2 font-semibold">5 Reviews</span>
            </div>
            <h5 className="font-semibold">Event Manager</h5>
            <p>
              {"Hi, I'm Sara! Originally from a small town near Porto, I ventured to Lisbon to pursue my passion for Business Management"}
            </p>
            <div className="flex justify-content-between">
              <div className="flex">
                <img src={CompaniesLogo} />
                <div className="ml-2">Dominos Pizza Ltd.</div>
              </div>
              <div>
                <span>2 month ago</span>
              </div>
            </div>
          </div>
          <div className="review-slide">
            <div className="flex">
              <Rating value={3} readOnly cancel={false} />
              <span className="ml-2 font-semibold">3 Reviews</span>
            </div>
            <h5 className="font-semibold">Digital Media</h5>
            <p>
              {"Hi, I'm Sara! Originally from a small town near Porto, I ventured to Lisbon to pursue my passion for Business Management"}
            </p>
            <div className="flex justify-content-between">
              <div className="flex">
                <img src={CompaniesLogo1} />
                <div className="ml-2">Delloite Softwares</div>
              </div>
             
              <div>
                <span>4 month ago</span>
              </div>
            </div>
          </div>
          <div className="review-slide">
            <div className="flex">
              <Rating value={2} readOnly cancel={false} />
              <span className="ml-2 font-semibold">2 Reviews</span>
            </div>
            <h5 className="font-semibold">Traveling Executive</h5>
            <p>
              {"Hi, I'm Sara! Originally from a small town near Porto, I ventured to Lisbon to pursue my passion for Business Management"}
            </p>
            <div className="flex justify-content-between">
              <div className="flex">
                <img src={CompaniesLogo3} />
                <div className="ml-2">Airbnb</div>
              </div>
              
              <div>
                <span>2 month ago</span>
              </div>
            </div>
          </div>
          <div className="review-slide">
            <div className="flex">
              <Rating value={5} readOnly cancel={false} />
              <span className="ml-2 font-semibold">5 Reviews</span>
            </div>
            <h5 className="font-semibold">Event Manager</h5>
            <p>
              {"Hi, I'm Sara! Originally from a small town near Porto, I ventured to Lisbon to pursue my passion for Business Management"}
            </p>
            <div className="flex justify-content-between">
              <div className="flex">
                <img src={CompaniesLogo} />
                <div className="ml-2">Dominos Pizza Ltd.</div>
              </div>
              
              <div>
                <span>2 month ago</span>
              </div>
            </div>
          </div>
          <div className="review-slide">
            <div className="flex">
              <Rating value={3} readOnly cancel={false} />
              <span className="ml-2 font-semibold">3 Reviews</span>
            </div>
            <h5 className="font-semibold">Digital Media</h5>
            <p>
              {"Hi, I'm Sara! Originally from a small town near Porto, I ventured to Lisbon to pursue my passion for Business Management"}
            </p>
            <div className="flex justify-content-between">
              <div className="flex">
                <img src={CompaniesLogo1} />
                <div className="ml-2">Delloite Softwares</div>
              </div>
              
              <div>
                <span>4 month ago</span>
              </div>
            </div>
          </div>
          <div className="review-slide">
            <div className="flex">
              <Rating value={2} readOnly cancel={false} />
              <span className="ml-2 font-semibold">2 Reviews</span>
            </div>
            <h5 className="font-semibold">Traveling Executive</h5>
            <p>
              {"Hi, I'm Sara! Originally from a small town near Porto, I ventured to Lisbon to pursue my passion for Business Management"}
            </p>
            <div className="flex justify-content-between">
              <div className="flex">
                <img src={CompaniesLogo3} />
                <div className="ml-2">Airbnb</div>
              </div>
              
              <div>
                <span>2 month ago</span>
              </div>
            </div>
          </div>
        </Slider>
      </Container>
    </div>
  );
};
export default PastJobReview;
