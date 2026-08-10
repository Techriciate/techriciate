'use server'

export async function submitContactForm(formData: FormData) {
  // Read the API key securely from environment variables (never exposed to the client)
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  
  if (!accessKey) {
    console.error("Missing WEB3FORMS_ACCESS_KEY in environment variables");
    return { success: false, error: "Server configuration error" };
  }

  formData.append("access_key", accessKey);
  formData.append("subject", `New Inquiry: ${formData.get('type') || 'General'}`);

  // Diagnostic change: Ensure we don't send an empty attachment file
  const attachment = formData.get("attachment");
  if (attachment instanceof File && (attachment.size === 0 || !attachment.name || attachment.name === "undefined")) {
    formData.delete("attachment");
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });
    
    const contentType = response.headers.get("content-type") || "";
    
    if (!response.ok || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("--- Web3Forms Diagnostic Info ---");
      console.error("Status:", response.status, response.statusText);
      console.error("Content-Type:", contentType);
      console.error("Body preview:", text.substring(0, 500));
      console.error("---------------------------------");
      return { success: false, error: "Server diagnostic mode: check logs" };
    }

    const data = await response.json();

    if (data.success) {
      return { success: true };
    } else {
      console.error("Form submission error", data);
      return { success: false, error: data.message || "Failed to submit" };
    }
  } catch (error) {
    console.error("Form fetch error", error);
    return { success: false, error: "Network error" };
  }
}
