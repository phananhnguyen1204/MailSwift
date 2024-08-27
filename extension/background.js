let storedEmailData = null;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Message received in background script:", message);

  // STORING EMAIL DATA
  if (message.action === "storeEmailData") {
    storedEmailData = message.emailData;
    console.log("Email data stored in background:", storedEmailData);
    return; // Ensure the message listener finishes after storing data
  }

  // NAVIGATE TO THE WEBSITE
  if (message.action === "openDraftURL") {
    chrome.tabs.create({ url: "http://localhost:5173" });
    return;
  }

  // GENERATE RESPONSE
  if (
    message.action === "generateEmailResponse" ||
    message.action === "summarizeEmailContent"
  ) {
    if (!storedEmailData) {
      console.error("No email data stored");
      sendResponse({ error: "No email data provided" });
      return;
    }

    const apiUrl =
      message.action === "generateEmailResponse"
        ? "http://localhost:5259/api/EmailResponseAPI/generate-email"
        : "http://localhost:5259/api/EmailResponseAPI/summarize-email";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storedEmailData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received response from backend:", data);
        chrome.runtime.sendMessage({
          action: "displayEmailResponse",
          response: data.email,
        });
        sendResponse({ success: true });
      })
      .catch((error) => {
        console.error("Error calling backend API:", error);
        chrome.runtime.sendMessage({
          action: "displayEmailResponse",
          response: "Error generating response: " + error.message,
        });
        sendResponse({ error: "Error generating response: " + error.message });
      });

    // Ensure sendResponse is called asynchronously
    return true;
  }
});
