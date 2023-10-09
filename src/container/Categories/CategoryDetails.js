import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Loader, StarRating } from "./../../components/Elements";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { businessDetailsMainApi } from "../../store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../components/Layout";
import categoryImg from "./../../assets/Images/cat-detail-slide.jpg";
import categoryImg2 from "./../../assets/Images/cat-detail-slide2.jpg";
import categoryImg3 from "./../../assets/Images/cat-detail-slide3.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CategoryDetails.css";

const CategoryDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actionReducer } = useSelector((state) => state);
  console.log(actionReducer, "actionNation");

  //state for businessDetails
  const [businessDetails, setBusinessDetails] = useState("");
  console.log({ businessDetails }, "businessDetailsbusinessDetails");

  // STATE FOR LOADER
  const [showLoader, setShowLoader] = useState(false);

  // state for businessDetail page
  const [stateBusinessDetail, setStateBusinessDetails] = useState({
    BusinessListingID: {
      value: "BUL_0x3e5e66548a59d1b7:0xe0a04808a11316b6",
      errorMessage: "",
      errorStatus: false,
    },
  });

  // const rating = 2.5;

  useEffect(() => {
    let newBusinessData = {
      BusinessListingID: stateBusinessDetail.BusinessListingID.value,
    };
    dispatch(businessDetailsMainApi(newBusinessData));
  }, []);

  useEffect(() => {
    if (
      actionReducer.businessListing !== null &&
      actionReducer.businessListing !== undefined
    ) {
      setBusinessDetails(actionReducer.businessListing);
    }
  }, []);

  console.log(actionReducer.businessListing, "actionReducerhashshsh");

  const clickHomeHandler = () => {
    navigate("/");
  };

  useEffect(() => {
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  }, []);

  return (
    <Fragment>
      <div className="swiper-category-slider">
        <Container>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                // navigation={true}
                modules={[Autoplay, Pagination]}
                className="carousel-swiper"
              >
                <SwiperSlide>
                  <img
                    src={`data:image/jpeg;base64,${businessDetails.listOfBase64Images}`}
                    alt="Slider"
                    className="slide-Image"
                  />
                </SwiperSlide>
              </Swiper>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="mb-4 margin-top-403">
          <Col lg={6} md={6} sm={6} xs={6} className="mt-2">
            <span className="title-emirates-heading">
              {businessDetails.name}
            </span>
            <Row className="mb-3">
              <Col lg={6} md={6} sm={12} xs={12}>
                {/* <span>{businessDetails.rating}</span> */}
                <span>
                  {/* <StarRating rating={rating} /> */}
                  <StarRating rating={businessDetails.rating} />
                  {businessDetails.reviews}
                </span>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
                <Button text="TOUR" className="Tour-button" />
              </Col>
            </Row>
          </Col>
          <Col
            lg={6}
            md={6}
            sm={6}
            xs={6}
            className="package-row-class flex-row"
          >
            <span className="verticalline"></span>
            <div className="line-height">
              <div className="package-start-heading">PACKAGES STARTS</div>
              <div className="package-start-heading">
                From{" "}
                <span className="five-dollar-title">
                  ${businessDetails.packageStarts}
                </span>
              </div>
              {/* <div className="five-dollar-title">5$</div> */}
            </div>
          </Col>
        </Row>

        {/* section for detail contact and location */}

        <Row>
          <Col lg={12} md={12} sm={12}>
            <p className="para-text">{businessDetails.aboutUs}</p>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12} className="Grourp-btn-col">
            <Button
              icon={<i className="icon-call call-etc-icons-sizes"></i>}
              className="buttons-call-etc"
              onClick={() =>
                window.open(businessDetails.contactNumber, "_blank")
              }
            ></Button>
            <Button
              icon={<i className="icon-location  call-etc-icons-sizes"></i>}
              className="buttons-call-etc"
              onClick={() => window.open(businessDetails.location, "_blank")}
            >
              {/* {businessDetails.location} */}
            </Button>
            <Button
              icon={<i className="icon-web call-etc-icons-sizes"></i>}
              onClick={() => window.open(businessDetails.website, "_blank")}
              className="buttons-call-etc"
            />{" "}
            <Button
              icon={<i className="icon-home call-etc-icons-sizes"></i>}
              onClick={clickHomeHandler}
              className="buttons-call-etc"
            />
          </Col>
        </Row>

        {/* section for what we offer */}

        <Row className="mt-5">
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="what-we-offer-heading">WHAT WE OFFER</span>
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <div className="what-we-offer-bullets ">
              {businessDetails.offering}
              {/* <span className="what-we-offer-subtitles">
                1. montmartre Neighoborhood had a charming, behemian feel with
                lots of quaint shops and cafes.
              </span>
              <span className="what-we-offer-subtitles">
                2. Accommodation booking.
              </span>
              <span className="what-we-offer-subtitles">3. Local guides.</span>
              <span className="what-we-offer-subtitles">4. 24/7 support.</span>
              <span className="what-we-offer-subtitles">
                5. Accommodation booking.
              </span>
              <span className="what-we-offer-subtitles">6. Local guides.</span> */}
            </div>
          </Col>
        </Row>

        {/* section for Here's what are customers have to say */}

        <Row className="mt-5">
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <span className="what-we-offer-heading">
              Here's what are customers have to say
            </span>
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <div className="what-we-offer-bullets ">
              <span className="what-we-offer-subtitles">
                1. The montmartre Neighoborhood had a charming, behemian feel
                with lots of quaint shops and cafes.
              </span>
              <span className="what-we-offer-subtitles">
                2. The montmartre Neighoborhood had a charming, behemian feel
                with lots of quaint shops and cafes.
              </span>
              <span className="what-we-offer-subtitles">
                3. The montmartre Neighoborhood had a charming, behemian feel
                with lots of quaint shops and cafes.
              </span>
              <span className="what-we-offer-subtitles">
                4. The montmartre Neighoborhood had a charming, behemian feel
                with lots of quaint shops and cafes.
              </span>
              <span className="what-we-offer-subtitles">
                5. The montmartre Neighoborhood had a charming, behemian feel
                with lots of quaint shops and cafes.
              </span>
              <span className="what-we-offer-subtitles">
                6. The montmartre Neighoborhood had a charming, behemian feel
                with lots of quaint shops and cafes.
              </span>
            </div>
          </Col>
        </Row>
      </Container>

      <Row className="mt-5">
        <Col lg={12} md={12} sm={12}>
          <Footer businessDetails={businessDetails} />
        </Col>
      </Row>

      {showLoader && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
    </Fragment>
  );
};

export default CategoryDetails;
