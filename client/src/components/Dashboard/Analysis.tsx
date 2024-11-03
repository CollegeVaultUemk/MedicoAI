import { Heart, Brain, Battery, Users, Shield } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  generateMHReport,
  getUsersMHAReport,
  selectAiChat,
} from "@/state/reducers/aichatReducer";
import { useEffect } from "react";
import NewSpinner from "../func-components/newSpinner";
import ChartReport from "../func-components/MHAChart";

const Analysis = () => {
  const dispatch = useAppDispatch();
  const { reportLoading, report, reportAppErr, reportServerErr } =
    useAppSelector(selectAiChat);

  useEffect(() => {
    dispatch(getUsersMHAReport());
  }, []);

  console.log("report", report);

  if (reportLoading) return <NewSpinner />;

  return (
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Analyze your Mental Health
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Our service analyzes your past chats to create a personalized mental
          health report, offering valuable insights into your mood, anxiety, and
          overall well-being.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <div
            onClick={() => dispatch(generateMHReport())}
            className="inline-flex cursor-pointer justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            {reportLoading ? <NewSpinner /> : "Click to Generate"}
          </div>
        </div>
        {(reportAppErr || reportServerErr) && (
          <p className="mb-10 text-red-500">
            {reportAppErr || reportServerErr}
          </p>
        )}
        {!report ? (
          <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span className="font-semibold text-gray-400 uppercase">
              What Metrics We Provide
            </span>
            <div className="flex flex-wrap justify-center gap-y-3 items-center mt-8 text-gray-500 sm:justify-between">
              <div className="flex gap-1 w-1/2 md:w-1/3  items-center">
                <Heart className="text-pink-500" />
                Overall Mood Score
              </div>
              <div className="flex gap-1 w-1/2 md:w-1/3  items-center">
                <Brain className="text-purple-500" />
                Anxiety Level
              </div>
              <div className="flex gap-1 w-1/2 md:w-1/3  items-center">
                <Battery className="text-blue-500" />
                Energy Level
              </div>
              <div className="flex gap-1 w-1/2 md:w-1/3  items-center">
                <Users className="text-green-500" />
                Social Engagement
              </div>
              <div className="flex gap-1 w-1/2 md:w-1/3  items-center">
                <Shield className="text-orange-500" />
                Coping Resilience
              </div>
              <div className="flex gap-1 w-1/2 md:w-1/3  items-center"></div>
            </div>
          </div>
        ) : (
          report && (
            <>
              <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                <span className="font-semibold text-gray-400 uppercase">
                  Your Mental Health Analysis Report
                </span>
                <div className="flex flex-wrap justify-center gap-y-6 items-center mt-8 text-gray-500 sm:justify-between">
                  <div className="flex flex-col w-full">
                    <div className="flex gap-1 w-full items-center">
                      <Heart className="text-pink-500" />
                      Overall Mood Score
                    </div>
                    <div className="flex w-full flex-col border-[2px] border-gray-300 shadow-lg rounded-md mt-2 gap-2 p-5">
                      <div className="text-left text-[18px]">
                        <span className="font-bold">Rating</span> :{" "}
                        {report.moodScore.rating}
                      </div>
                      <div className="text-left text-[18px]">
                        <span className="font-bold">Comment</span> :{" "}
                        {report.moodScore.comment}{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex gap-1 w-full items-center">
                      <Brain className="text-purple-500" />
                      Anxiety Level
                    </div>
                    <div className="flex w-full flex-col border-[2px] border-gray-300 shadow-lg rounded-md mt-2 gap-2 p-5">
                      <div className="text-left text-[18px]">
                        <span className="font-bold">Rating</span> :{" "}
                        {report.anxietyScore.rating}
                      </div>
                      <div className="text-left text-[18px]">
                        <span className="font-bold">Comment</span> :{" "}
                        {report.anxietyScore.comment}{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex gap-1 w-full items-center">
                      <Battery className="text-blue-500" />
                      Energy Level
                    </div>
                    <div className="flex w-full flex-col border-[2px] border-gray-300 shadow-lg rounded-md mt-2 gap-2 p-5">
                      <div className="text-left text-[18px]">
                        <span className="font-bold">Rating</span> :{" "}
                        {report.energyScore.rating}
                      </div>
                      <div className="text-left text-[18px]">
                        <span className="font-bold">Comment</span> :{" "}
                        {report.energyScore.comment}{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex gap-1 w-full items-center">
                      <Users className="text-green-500" />
                      Social Engagement
                    </div>
                    <div className="flex w-full flex-col border-[2px] border-gray-300 shadow-lg rounded-md mt-2 gap-2 p-5">
                      <div className="text-left text-[18px]">
                        <span className="font-bold">Rating</span> :{" "}
                        {report.socialScore.rating}
                      </div>
                      <div className="text-left text-[18px]">
                        <span className="font-bold">Comment</span> :{" "}
                        {report.socialScore.comment}{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex gap-1 w-full items-center">
                      <Shield className="text-orange-500" />
                      Coping Resilience
                    </div>
                    <div className="flex w-full flex-col border-[2px] border-gray-300 shadow-lg rounded-md mt-2 gap-2 p-5">
                      <div className="text-left text-[18px]">
                        <span className="font-bold">Rating</span> :{" "}
                        {report.copingScore.rating}
                      </div>
                      <div className="text-left text-[18px]">
                        <span className="font-bold">Comment</span> :{" "}
                        {report.copingScore.comment}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-20">
                <ChartReport
                  moodScore={parseInt(report.moodScore.rating)}
                  anxietyScore={parseInt(
                    report.anxietyScore.rating?.split("/")[0]
                  )}
                  energyScore={parseInt(
                    report.energyScore.rating?.split("/")[0]
                  )}
                  socialScore={parseInt(
                    report.socialScore.rating?.split("/")[0]
                  )}
                  copingScore={parseInt(
                    report.copingScore.rating?.split("/")[0]
                  )}
                  latestUpdate={report.updatedAt}
                />
              </div>
            </>
          )
        )}
      </div>
    </section>
  );
};

export default Analysis;
