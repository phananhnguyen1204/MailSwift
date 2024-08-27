document.addEventListener("DOMContentLoaded", function () {
  const generateButton = document.getElementById("generateButton");
  const summarizeButton = document.getElementById("summarizeButton");
  const draftButton = document.getElementById("draftButton");
  const responseArea = document.getElementById("responseArea");

  generateButton.addEventListener("click", function () {
    // Send a message to the background script to trigger email response generation
    chrome.runtime.sendMessage({ action: "generateEmailResponse" });
  });

  draftButton.addEventListener("click", function () {
    console.log("draft email clicked");
    chrome.runtime.sendMessage({ action: "openDraftURL" });
  });

  summarizeButton.addEventListener("click", function () {
    // Send a message to the background script to trigger email response generation
    console.log("Summarize button clicked");
    chrome.runtime.sendMessage({ action: "summarizeEmailContent" });
  });

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
