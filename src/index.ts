import { computePosition, flip, shift } from "@floating-ui/dom";
import { createFocusTrap } from "focus-trap";
import html2canvas from "html2canvas";

import { formHTML } from "./form-html";
import formCSS from "./form.css";

let screenshotData: string | null = null;

export type FeedbackFinConfig = {
  url: string;
  user: Record<any, any>;
  disableErrorAlert: boolean;
};
const defaultConfig: FeedbackFinConfig = {
  url: "",
  user: {},
  disableErrorAlert: false,
};

function getConfig(): FeedbackFinConfig {
  return {
    ...defaultConfig,
    ...(window as any).feedbackfin?.config,
  };
}

function init() {
  const styleElement = document.createElement("style");
  styleElement.id = "feedbackfin__css";
  styleElement.innerHTML = formCSS;

  document.head.insertBefore(styleElement, document.head.firstChild);

  document.querySelectorAll("[data-feedbackfin-button]").forEach((el) => {
    el.addEventListener("click", open);
  });
}
window.addEventListener("load", init);

const containerElement = document.createElement("div");
containerElement.id = "feedbackfin__container";

const trap = createFocusTrap(containerElement, {
  initialFocus: "#feedbackfin__radio--issue",
  allowOutsideClick: true,
});

function open(e: Event) {
  document.body.appendChild(containerElement);
  containerElement.innerHTML = formHTML;
  containerElement.style.display = "block";
  containerElement.style.opacity = "1";

  const target = (e?.target as HTMLElement) || document.body;
  computePosition(target, containerElement, {
    placement: "bottom",
    middleware: [flip(), shift({ crossAxis: true, padding: 8 })],
    strategy: "fixed",
  }).then(({ x, y }) => {
    Object.assign(containerElement.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  });

  trap.activate();

  document
    .getElementById("feedbackfin__close")!
    .addEventListener("click", close);

  Array.from(
    containerElement.getElementsByClassName("feedbackfin__radio"),
  ).forEach((el) => {
    el.addEventListener("change", changeType);
  });

  document
    .getElementById("feedbackfin__form")!
    .addEventListener("submit", submit);

  document
    .getElementById("feedbackfin__screenshot-btn")!
    .addEventListener("click", captureScreenshot);

  document
    .getElementById("feedbackfin__screenshot-remove")!
    .addEventListener("click", removeScreenshot);

  document
    .getElementById("feedbackfin__screenshot-link")!
    .addEventListener("click", viewScreenshot);

  document.addEventListener("click", handleOutsideClick);
}

function handleOutsideClick(e: MouseEvent) {
  if (
    containerElement.hasAttribute("data-success") &&
    !containerElement.contains(e.target as Node)
  ) {
    close();
  }
}

function close() {
  trap.deactivate();
  document.removeEventListener("click", handleOutsideClick);

  containerElement.innerHTML = "";

  containerElement.remove();
  containerElement.removeAttribute("data-feedback-type");
  containerElement.removeAttribute("data-success");
  containerElement.removeAttribute("data-has-screenshot");
  screenshotData = null;
}

function changeType(e: Event) {
  const value = (e.target as HTMLInputElement).value;

  containerElement.setAttribute("data-feedback-type", value);

  let placeholder = "I think…";
  if (value === "issue") placeholder = "I'm having an issue with…";
  else if (value === "idea") placeholder = "I'd like to see…";

  document
    .getElementById("feedbackfin__message")
    ?.setAttribute("placeholder", placeholder);
}

function captureScreenshot() {
  const screenshotBtn = document.getElementById("feedbackfin__screenshot-btn")!;
  screenshotBtn.setAttribute("disabled", "");

  html2canvas(document.body, {
    logging: false,
    useCORS: true,
    allowTaint: true,
    onclone: (clonedDoc) => {
      // Hide the widget in the cloned DOM only (no visible flash)
      const clonedContainer = clonedDoc.getElementById(
        "feedbackfin__container",
      );
      if (clonedContainer) {
        clonedContainer.style.display = "none";
      }
    },
  })
    .then((canvas) => {
      screenshotData = canvas.toDataURL("image/png");

      const imgElement = document.getElementById(
        "feedbackfin__screenshot-img",
      ) as HTMLImageElement;
      imgElement.src = screenshotData;

      containerElement.setAttribute("data-has-screenshot", "");
    })
    .catch((error) => {
      console.error("Feedback Fin: Failed to capture screenshot", error);
    })
    .then(() => {
      screenshotBtn.removeAttribute("disabled");
    });
}

function removeScreenshot() {
  screenshotData = null;
  containerElement.removeAttribute("data-has-screenshot");

  const imgElement = document.getElementById(
    "feedbackfin__screenshot-img",
  ) as HTMLImageElement;
  imgElement.src = "";
}

function viewScreenshot() {
  if (!screenshotData) return;

  const newWindow = window.open("");
  if (newWindow) {
    newWindow.document.write(
      `<html><head><title>Screenshot</title></head><body style="margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#1a1a1a;"><img src="${screenshotData}" style="max-width:100%;max-height:100vh;"/></body></html>`,
    );
  }
}

function submit(e: Event) {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  const config = getConfig();

  if (!config.url) {
    console.error("Feedback Fin: No URL provided");
    if (!config.disableErrorAlert)
      alert("Could not send feedback: No URL provided");
    return;
  }

  const submitElement = document.getElementById("feedbackfin__submit")!;
  submitElement.setAttribute("disabled", "");
  submitElement.innerHTML = "Sending…";

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const data: Record<string, any> = {
    ...config.user,
    feedbackType: (target.elements as any).feedbackType.value,
    message: (target.elements as any).message.value,
    timestamp: Date.now(),
  };

  if (screenshotData) {
    data.screenshot = screenshotData;
  }

  fetch(config.url, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
  })
    .then(() => {
      containerElement.setAttribute("data-success", "");
      setTimeout(() => {
        containerElement.style.opacity = "0";
        setTimeout(close, 500);
      }, 2000);
    })
    .catch((e) => {
      console.error("Feedback Fin:", e);
      if (!config.disableErrorAlert)
        alert(`Could not send feedback: ${e.message}`);
    });

  return false;
}

const feedbackfin = {
  init,
  open,
  changeType,
  close,
  submit,
  captureScreenshot,
  removeScreenshot,
  viewScreenshot,
  config: defaultConfig,
};
(window as any).feedbackfin = feedbackfin;

export default feedbackfin;
