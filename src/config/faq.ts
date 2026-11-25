import { siteConfig } from "@/config/site";

export const faqs = [
  {
    q: "What does this actually do?",
    a: "It reads the conversation export you get from xAI and draws every chat as a point in a 3D space. Chats about similar things end up close together. Next to that you get a timeline, a topic list, a few statistics about how and when you write, and a list of facts you mentioned about yourself.",
  },
  {
    q: "Does my export get uploaded anywhere?",
    a: 'No. The file is parsed by a Web Worker in your browser and the result goes into IndexedDB on your device. The server only delivers the app itself. The page "Check it yourself" shows how to confirm this in your browser\'s developer tools.',
  },
  {
    q: "Is an AI model reading my chats?",
    a: "No. The topics come from TF-IDF keyword clustering, the mood from a word list, the facts from pattern matching. All of it is ordinary code running in your tab, with no calls to an AI service.",
  },
  {
    q: "Which file do I need?",
    a: "The JSON file from your xAI data export that contains your conversations. The help page explains where to request it.",
  },
  {
    q: "How do I delete everything?",
    a: 'Use "Delete data" at the top of the app. It wipes the local database. Clearing this site\'s data in your browser settings does the same.',
  },
  {
    q: "Does it work offline?",
    a: "Once the page has loaded, yes. Fonts and code are served from this domain, and there is nothing to call home to.",
  },
  {
    q: "Which browsers work?",
    a: "Current versions of Chrome, Edge, Firefox and Safari. The brain view needs WebGL, so very old phones may only show the other views.",
  },
  {
    q: "Is this made by xAI?",
    a: "No. It is a free side project by shiftbloom studio and not affiliated with xAI or X. Grok is a trademark of its owner.",
  },
  {
    q: "Can I see the code?",
    a: `Yes, it is open source under the AGPL-3.0 at ${siteConfig.github.replace("https://", "")}.`,
  },
];
