import Head1 from "./head1";
import "./donationpage.css";
import Footer from "./footer";
import StepperComponent from "./step";
import "./donation.css";

export default function DonationPage() {
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
