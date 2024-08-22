document.addEventListener("DOMContentLoaded", function () {
  console.log("Popup script loaded");

  const generateButton = document.getElementById("generateButton");
  // const summarizeButton = document.getElementById("summarizeButton");
  const responseArea = document.getElementById("responseArea");
  if (responseArea) {
    console.error("Response area element found!");
  }
  generateButton.addEventListener("click", function () {
    // Send a message to the background script to trigger email response generation
    console.log("Generate button clicked");
    chrome.runtime.sendMessage({ action: "generateEmailResponse" });
  });

  // summarizeButton.addEventListener("click", function () {
  //   // Send a message to the background script to trigger email response generation
  //   console.log("Summarize button clicked");
  //   chrome.runtime.sendMessage({ action: "summarizeEmail" });
  // });

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    console.log("Message response:", message.response); // Add this
    if (message.action === "displayEmailResponse") {
      console.log("Displaying the response");
      console.log("Response area element:", responseArea);
      responseArea.textContent = message.response;
    }
  });
});
