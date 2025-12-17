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
const config: FeedbackFinConfig = {
  url: "",
  user: {},
  disableErrorAlert: false,
  // Spread user config when loaded
  ...(window as any).feedbackfin?.config,
};

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
    containerElement.getElementsByClassName("feedbackfin__radio")
  ).forEach((el) => {
    el.addEventListener("change", changeType);
  });

  document
    .getElementById("feedbackfin__form")!
    .addEventListener("submit", submit);

  document
    .getElementById("feedbackfin__screenshot")!
    .addEventListener("click", captureScreenshot);
}

function close() {
  trap.deactivate();

  containerElement.innerHTML = "";

  containerElement.remove();
  containerElement.removeAttribute("data-feedback-type");
  containerElement.removeAttribute("data-success");
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

async function captureScreenshot() {
  const screenshotBtn = document.getElementById("feedbackfin__screenshot")!;
  const previewContainer = document.getElementById(
    "feedbackfin__screenshot-preview"
  )!;

  // Hide the feedback container temporarily
  containerElement.style.display = "none";

  try {
    const canvas = await html2canvas(document.body, {
      logging: false,
      useCORS: true,
      allowTaint: true,
    });

    screenshotData = canvas.toDataURL("image/png");

    // Show preview
    previewContainer.innerHTML = `
      <img src="${screenshotData}" alt="Screenshot preview" />
      <button
        id="feedbackfin__screenshot-remove"
        class="feedbackfin__icon-button"
        type="button"
        aria-label="Remove screenshot"
        title="Remove screenshot"
      >
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    screenshotBtn.setAttribute("data-captured", "");

    document
      .getElementById("feedbackfin__screenshot-remove")!
      .addEventListener("click", removeScreenshot);
  } catch (error) {
    console.error("Feedback Fin: Screenshot capture failed", error);
  }

  // Show the feedback container again
  containerElement.style.display = "block";
}

function removeScreenshot() {
  screenshotData = null;
  const screenshotBtn = document.getElementById("feedbackfin__screenshot")!;
  const previewContainer = document.getElementById(
    "feedbackfin__screenshot-preview"
  )!;

  screenshotBtn.removeAttribute("data-captured");
  previewContainer.innerHTML = "";
}

function submit(e: Event) {
  e.preventDefault();
  const target = e.target as HTMLFormElement;

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
  config,
};
(window as any).feedbackfin = feedbackfin;

export default feedbackfin;
