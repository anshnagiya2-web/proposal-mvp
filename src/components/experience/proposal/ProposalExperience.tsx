"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ProposalData } from "@/lib/types";
import { ProposalPage1 } from "./ProposalPage1";
import { ProposalPage2 } from "./ProposalPage2";
import { ProposalPage3 } from "./ProposalPage3";
import { ProposalPage4 } from "./ProposalPage4";
import { ProposalPage5 } from "./ProposalPage5";
import { ProposalPage6 } from "./ProposalPage6";
import { ProposalPage7 } from "./ProposalPage7";
import { ProposalPage8 } from "./ProposalPage8";

export function ProposalExperience({ data }: { data: ProposalData }) {
  const [page, setPage] = useState(1);
  const [choice, setChoice] = useState<"yes" | "no">("yes");

  const next = () => setPage((p) => Math.min(8, p + 1));

  return (
    <div className="grain relative flex h-full min-h-[100dvh] w-full flex-col overflow-hidden bg-gradient-to-b from-bg-soft to-bg">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(231,166,103,0.08),transparent_65%)]" />
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-1 flex-col"
        >
          {page === 1 && (
            <ProposalPage1
              text={data.page1.text}
              recipientName={data.recipientName}
              onNext={next}
            />
          )}
          {page === 2 && (
            <ProposalPage2
              line1={data.page2.line1}
              line2={data.page2.line2}
              onChoose={(c) => {
                setChoice(c);
                next();
              }}
            />
          )}
          {page === 3 && (
            <ProposalPage3
              choice={choice}
              yesText={data.page3.yesText}
              noText={data.page3.noText}
              gameIntro={data.page3.gameIntro}
              gameQuestion={data.page3.gameQuestion}
              options={data.page3.options}
              responses={data.page3.responses}
              onNext={next}
            />
          )}
          {page === 4 && (
            <ProposalPage4
              text={data.page4.text}
              media={data.page4.media}
              onNext={next}
            />
          )}
          {page === 5 && (
            <ProposalPage5
              text={data.page5.text}
              media={data.page5.media}
              onNext={next}
            />
          )}
          {page === 6 && (
            <ProposalPage6
              line1={data.page6.line1}
              line2={data.page6.line2}
              onNext={next}
            />
          )}
          {page === 7 && (
            <ProposalPage7
              confession={data.page7.confession}
              proposalText={data.page7.proposalText}
              recipientName={data.recipientName}
              onYes={next}
            />
          )}
          {page === 8 && (
            <ProposalPage8
              text={data.page8.text}
              finalLine={data.page8.finalLine}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
