export type FeedbackFinConfig = {
  url: string;
  user: Record<any, any>;
  disableErrorAlert: boolean;
  theme: "auto" | "light" | "dark";
};
declare function init(): void;
declare function open(e: Event): void;
declare function close(): void;
declare function changeType(e: Event): void;
declare function captureScreenshot(): void;
declare function removeScreenshot(): void;
declare function viewScreenshot(): void;
declare function submit(e: Event): false | undefined;
declare const feedbackfin: {
  init: typeof init;
  open: typeof open;
  changeType: typeof changeType;
  close: typeof close;
  submit: typeof submit;
  captureScreenshot: typeof captureScreenshot;
  removeScreenshot: typeof removeScreenshot;
  viewScreenshot: typeof viewScreenshot;
  config: FeedbackFinConfig;
};
export default feedbackfin;
