export type Memory = {
  id: string;
  image: string; // data URL for the demo/local version
  caption: string;
};

export type GuessBlock = {
  enabled: boolean;
  prompt: string;
  options: string[];
};

export type TapBlock = {
  enabled: boolean;
  prompt: string;
  taps: number;
};

export type HiddenMessageBlock = {
  enabled: boolean;
  prompt: string;
  message: string;
};

export type SurpriseData = {
  id: string;
  template: "love";
  recipientName: string;
  senderName: string;
  message: string;
  memories: Memory[];
  guess: GuessBlock;
  tap: TapBlock;
  hidden: HiddenMessageBlock;
  finalMessage: string;
  finalSignoff: string;
  createdAt: number;
};

export const createEmptySurprise = (): SurpriseData => ({
  id: "",
  template: "love",
  recipientName: "",
  senderName: "",
  message: "",
  memories: [],
  guess: {
    enabled: true,
    prompt: "What's waiting for you?",
    options: ["Something cute", "Something emotional", "Something unexpected"],
  },
  tap: {
    enabled: true,
    prompt: "Tap the heart a few times.",
    taps: 5,
  },
  hidden: {
    enabled: true,
    prompt: "There's one thing I haven't said yet.",
    message: "",
  },
  finalMessage: "",
  finalSignoff: "Made just for you.",
  createdAt: 0,
});

/* =========================================================================
 * Proposal template
 * ===================================================================== */

export type MediaItem = {
  id: string;
  type: "image" | "video";
  src: string; // data URL for the demo/local version
};

export type ProposalData = {
  id: string;
  template: "proposal";
  recipientName: string;

  page1: {
    text: string; // use {name} as a placeholder for the recipient name
  };

  page2: {
    line1: string;
    line2: string;
  };

  page3: {
    yesText: string;
    noText: string; // multi-line, one line per beat
    gameIntro: string;
    gameQuestion: string;
    options: [string, string, string];
    responses: [string, string, string];
  };

  page4: {
    text: string;
    media: MediaItem[]; // max 3
  };

  page5: {
    text: string;
    media: MediaItem[]; // max 5
  };

  page6: {
    line1: string;
    line2: string;
  };

  page7: {
    confession: string; // multi-line, one line per beat
    proposalText: string; // use {name} as a placeholder for the recipient name
  };

  page8: {
    text: string; // multi-paragraph, blank lines separate paragraphs
    finalLine: string;
  };

  createdAt: number;
};

export const createEmptyProposal = (): ProposalData => ({
  id: "",
  template: "proposal",
  recipientName: "",
  page1: {
    text: "Hi... {name} ❤️",
  },
  page2: {
    line1: "I really wanted to tell you something...",
    line2: "Are you interested to know what?",
  },
  page3: {
    yesText: "Good to know that you want to know... ❤️",
    noText: "🥺\nYeah, I get it...\nBut me toh bata kar hi rahunga. 😌",
    gameIntro: "Before I tell you... let's play a little game. 👀",
    gameQuestion: "What do you think is waiting for you?",
    options: ["Something cute", "Something emotional", "Something unexpected"],
    responses: [
      "Maybe... but you're not quite there yet. 👀",
      "You're getting warmer... ❤️",
      "Ohhh... you have no idea. 😏",
    ],
  },
  page4: {
    text: "I know it hasn't been that long since we met...",
    media: [],
  },
  page5: {
    text: "But in the little time I've gotten to know you, every moment I've spent with you has become one of my favorite moments. ❤️",
    media: [],
  },
  page6: {
    line1: "Finally, there's something I want to tell you...",
    line2: "Are you ready to hear it? ❤️",
  },
  page7: {
    confession:
      "Aapka yun halka sa sharmaana...\n\nMeri aankhon mein aankhein daal kar dekhna...\n\nAapki woh saari khurafati baatein aur kahaniyaan...\n\nAapki aankhein... aapki awaaz...\n\nPata hi nahi chala kab yeh sab mujhe itna pasand aane laga...\n\nI'm fallen for you. ❤️",
    proposalText: "Will you be my girlfriend, Miss {name}?",
  },
  page8: {
    text: "Main kabhi jaan-boojhkar aapko badalne ya hurt karne wala insaan nahi banna chahta. Aur aapko mujhe kabhi apne past ya apne ex se compare karne ki zarurat nahi hai.\n\nHo sakta hai hum dono mein kuch similarities ho, kuch cheezein aapko past ki yaad dilaayein... lekin aapko chhod kar chale jaana mere bas ki baat hi nahi hai.\n\nJab se aapse mila hoon, pata nahi kyun duniya thodi aur pyaari lagne lagi hai. Andar se ek alag hi khushi rehne lagi hai. Iske liye thank you... all thanks to you, and that one train journey. ❤️\n\nAur ab jab aap meri zindagi ka itna khoobsurat hissa ban hi gayi hain, toh main apni aage ki zindagi bhi aapke saath build karna chahta hoon.",
    finalLine: "I LOVE YOU ❤️",
  },
  createdAt: 0,
});

export function fillName(template: string, name: string) {
  return template.replaceAll("{name}", name.trim() || "you");
}

