import Head1 from "./head1";
import "./donationpage.css";
import Footer from "./footer";
import StepperComponent from "./step";
import "./donation.css";
import { useLocation } from "react-router-dom";
export default function DonationPage() {
  const location = useLocation();
  const donnerClicked = location.state?.donnerClicked;
  console.log(donnerClicked);
  return (
    <div className="donation-body">
      <div className="head11">
        <Head1 />
      </div>

      <div className="stepper1">
        <StepperComponent></StepperComponent>
      </div>

      <div className="foot3">
        <Footer />
      </div>
    </div>
  );
}
