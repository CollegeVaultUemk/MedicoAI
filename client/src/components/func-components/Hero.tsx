import { Button } from "../ui/button";
import ReactPlayer from "react-player";
import video from "../../assets/videos/sample.mp4";

const Hero = () => {
  return (
    <div className="flex flex-col items-center px-5 md:px-10 font-Montserrat">
      <div className="my-[100px] flex flex-col items-center gap-7">
        <h1 className="text-[50px] text-[#495641]">Get Well, Sooner</h1>
        <p className="text-[20px] max-w-[70%] text-center text-[#495641]">
          Revolutionary healthcare app that merges AI and real doctors for
          comprehensive consultations.
        </p>
      </div>
      <Button
        variant="default"
        className="bg-[#008080] text-white w-[200px] mb-10"
      >
        Try for Free
      </Button>
      <ReactPlayer
        url={video}
        width="70%"
        height="70%"
        playing={true}
        muted={true}
        loop={true}
        style={{ marginBottom: "50px" }}
      />
    </div>
  );
};

export default Hero;
